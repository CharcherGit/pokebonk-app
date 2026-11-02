/**
 * Discord Rich Presence (docs/DESKTOP.md, «Discord»): «Jugando a PokéBonk» on the player's Discord profile, with what the game
 * tells us (the Pokémon, the zone, the time). Discord's local IPC, written here instead of a library: a named pipe (Windows)
 * or a Unix socket, an 8-byte header (opcode, length, little-endian) and JSON. Nothing goes over the network from here.
 *
 * Discord may be closed, or opened after the game: we retry every 20 s while the option is on and stay quiet otherwise.
 * Discord takes about 5 activity updates per 20 s; we send at most one every 4 s (the last one wins).
 */
import { connect, type Socket } from 'node:net';
import { join } from 'node:path';

/** «PokéBonk» application on discord.com/developers (its name is the «Jugando a …» line). */
export const DISCORD_APP_ID = process.env.POKEBONK_DISCORD_ID ?? '1559293304611410001';

export type Activity = {
  details?: string;
  state?: string;
  start?: number;
  largeImage?: string;
  largeText?: string;
  smallImage?: string;
  smallText?: string;
  buttons?: { label: string; url: string }[];
};

const OP_HANDSHAKE = 0, OP_FRAME = 1, OP_CLOSE = 2, OP_PING = 3, OP_PONG = 4;

function sockets(): string[] {
  const out: string[] = [];
  if (process.platform === 'win32') {
    for (let i = 0; i < 10; i++) out.push(`\\\\?\\pipe\\discord-ipc-${i}`);
    return out;
  }
  const env = process.env;
  const bases = [env.XDG_RUNTIME_DIR, env.TMPDIR, env.TMP, env.TEMP, '/tmp'].filter((b): b is string => !!b);
  // Discord from Flatpak or Snap (Steam Deck: Flatpak) keeps its socket in its own folder.
  const subs = ['', 'app/com.discordapp.Discord', 'app/com.discordapp.DiscordCanary', 'snap.discord', 'snap.discord-canary', '.flatpak/dev.vencord.Vesktop/xdg-run'];
  for (let i = 0; i < 10; i++) for (const b of bases) for (const s of subs) out.push(join(b, s, `discord-ipc-${i}`));
  return [...new Set(out)];
}

function frame(op: number, data: unknown) {
  const body = Buffer.from(JSON.stringify(data), 'utf8');
  const head = Buffer.alloc(8);
  head.writeInt32LE(op, 0);
  head.writeInt32LE(body.length, 4);
  return Buffer.concat([head, body]);
}

export class DiscordPresence {
  private sock: Socket | null = null;
  private ready = false;
  private on = false;
  private retry: NodeJS.Timeout | null = null;
  private sendTimer: NodeJS.Timeout | null = null;
  private lastSent = 0;
  private want: Activity | null = null;
  private buf = Buffer.alloc(0);

  constructor(private appId: string) {}

  /** Turns presence on or off (Ajustes → Pantalla → «Mostrar en Discord»). Off clears it at once. */
  enable(on: boolean) {
    if (on === this.on || !this.appId) return;
    this.on = on;
    if (on) this.connect();
    else {
      if (this.ready) this.write(null);
      this.close();
    }
  }

  /** The activity to show (the last one wins; null clears it). */
  set(a: Activity | null) {
    this.want = a;
    this.schedule();
  }

  private schedule() {
    if (!this.on || !this.ready || this.sendTimer) return;
    const wait = Math.max(0, 4000 - (Date.now() - this.lastSent));
    this.sendTimer = setTimeout(() => { this.sendTimer = null; if (this.ready) this.write(this.want); }, wait);
  }

  private write(a: Activity | null) {
    this.lastSent = Date.now();
    const activity = a && {
      type: 0,
      ...(a.details ? { details: a.details } : {}),
      ...(a.state ? { state: a.state } : {}),
      ...(a.start ? { timestamps: { start: a.start } } : {}),
      assets: {
        ...(a.largeImage ? { large_image: a.largeImage } : {}),
        ...(a.largeText ? { large_text: a.largeText } : {}),
        ...(a.smallImage ? { small_image: a.smallImage } : {}),
        ...(a.smallText ? { small_text: a.smallText } : {}),
      },
      ...(a.buttons?.length ? { buttons: a.buttons.slice(0, 2) } : {}),
    };
    this.send(OP_FRAME, { cmd: 'SET_ACTIVITY', args: { pid: process.pid, activity }, nonce: `${Date.now()}-${Math.random().toString(36).slice(2)}` });
  }

  private send(op: number, data: unknown) {
    try { this.sock?.write(frame(op, data)); } catch { this.close(true); }
  }

  private connect() {
    if (!this.on || this.sock) return;
    const paths = sockets();
    const tryAt = (i: number) => {
      if (!this.on) return;
      if (i >= paths.length) return this.later();
      const s = connect(paths[i]);
      let opened = false;
      s.once('connect', () => {
        opened = true;
        this.sock = s;
        this.buf = Buffer.alloc(0);
        s.on('data', (d) => this.read(Buffer.from(d)));
        s.on('close', () => { if (this.sock === s) this.close(true); });
        s.on('error', () => { /* 'close' follows */ });
        this.send(OP_HANDSHAKE, { v: 1, client_id: this.appId });
      });
      s.once('error', () => { if (!opened) { s.destroy(); tryAt(i + 1); } });
    };
    tryAt(0);
  }

  private read(d: Buffer) {
    this.buf = Buffer.concat([this.buf, d]);
    while (this.buf.length >= 8) {
      const op = this.buf.readInt32LE(0), len = this.buf.readInt32LE(4);
      if (this.buf.length < 8 + len) return;
      let msg: { cmd?: string; evt?: string } = {};
      try { msg = JSON.parse(this.buf.subarray(8, 8 + len).toString('utf8')); } catch { /* ignore a bad frame */ }
      this.buf = this.buf.subarray(8 + len);
      if (op === OP_PING) this.send(OP_PONG, msg);
      else if (op === OP_CLOSE) { this.close(true); return; }
      else if (op === OP_FRAME && msg.evt === 'READY') { this.ready = true; this.lastSent = 0; this.schedule(); }
    }
  }

  /** Drops the connection; with `again`, tries again later (Discord restarted or was closed). */
  private close(again = false) {
    this.ready = false;
    if (this.sendTimer) { clearTimeout(this.sendTimer); this.sendTimer = null; }
    const s = this.sock;
    this.sock = null;
    try { s?.destroy(); } catch { /* already gone */ }
    if (again) this.later();
    else if (this.retry) { clearTimeout(this.retry); this.retry = null; }
  }

  private later() {
    if (!this.on || this.retry) return;
    this.retry = setTimeout(() => { this.retry = null; this.connect(); }, 20_000);
  }
}
