/**
 * What the page can ask the desktop client for: `window.pokebonkDesktop` (src/core/desktop.ts reads it in the game).
 * Kept minimal on purpose: the page is a website, so nothing here reaches files or the system.
 */
import { contextBridge, ipcRenderer } from 'electron';

const version = /PokeBonkDesktop\/([\d.]+)/.exec(navigator.userAgent)?.[1] ?? '';

/**
 * The window's fullscreen (1.2.0): Esc doesn't leave it, unlike the page's, so the page can't see it in
 * `document.fullscreenElement`. It reads `fullscreen()` instead, and gets a `fullscreenchange` like the page's own.
 */
let fullscreen = ipcRenderer.sendSync('pb:fullscreen') as boolean;
ipcRenderer.on('pb:fs', (_e, on: boolean) => {
  if (fullscreen === on) return;
  fullscreen = on;
  document.dispatchEvent(new Event('fullscreenchange'));
});

contextBridge.exposeInMainWorld('pokebonkDesktop', {
  version,
  platform: process.platform,
  /** Closes the client (during a run the game's beforeunload asks first). */
  quit: () => ipcRenderer.send('pb:quit'),
  /** Ajustes → Pantalla: window or fullscreen, size, monitor, V-Sync and graphics backend (desktop/src/main.ts, DisplayState). */
  display: () => ipcRenderer.invoke('pb:display'),
  /** The window is fullscreen (see above). Missing before 1.2.0, where fullscreen was the page's. */
  fullscreen: () => fullscreen,
  setDisplay: (p: { mode?: string; size?: string; monitor?: number; vsync?: boolean; angle?: string; discord?: boolean }) => ipcRenderer.invoke('pb:setDisplay', p),
  /** Restarts the client (V-Sync applies on launch); during a run the game asks first, like closing. */
  relaunch: () => ipcRenderer.send('pb:relaunch'),
  /** The offline page's button: load the game again. */
  retry: () => ipcRenderer.send('pb:retry'),
  /** Discord Rich Presence (1.4.0): what the player is doing; null goes back to plain «Jugando a PokéBonk». */
  presence: (p: { details?: string; state?: string; start?: number; largeImage?: string; largeText?: string; smallImage?: string; smallText?: string } | null) => ipcRenderer.send('pb:presence', p),
  /** Automatic updates (1.4.0, updater.ts): the state now, every change, and «install and restart» once it is 'ready'. */
  update: {
    state: () => ipcRenderer.invoke('pb:updateState'),
    onChange: (cb: (s: unknown) => void) => { ipcRenderer.on('pb:update', (_e, s) => cb(s)); },
    install: () => ipcRenderer.send('pb:updateInstall'),
  },
});
