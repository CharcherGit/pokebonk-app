const { test } = require('node:test');
const assert = require('node:assert/strict');
const { DiscordPresence } = require('../out/discord');

function header(length, op = 1) {
  const bytes = Buffer.alloc(8);
  bytes.writeInt32LE(op, 0);
  bytes.writeInt32LE(length, 4);
  return bytes;
}

function presenceWithSocket() {
  const presence = new DiscordPresence('123');
  const socket = { destroyed: false, destroy() { this.destroyed = true; } };
  presence.sock = socket;
  return { presence, socket };
}

test('rejects a negative frame length and drops the socket', () => {
  const { presence, socket } = presenceWithSocket();
  presence.read(header(-1));
  assert.equal(socket.destroyed, true);
  assert.equal(presence.sock, null);
  assert.equal(presence.buf.length, 0);
});

test('rejects an oversized frame before waiting for its body', () => {
  const { presence, socket } = presenceWithSocket();
  presence.read(header(1024 * 1024 + 1));
  assert.equal(socket.destroyed, true);
  assert.equal(presence.buf.length, 0);
});

test('still accepts a valid frame split across reads', () => {
  const { presence, socket } = presenceWithSocket();
  const body = Buffer.from(JSON.stringify({ evt: 'READY' }));
  const bytes = Buffer.concat([header(body.length), body]);
  presence.read(bytes.subarray(0, 5));
  presence.read(bytes.subarray(5, 10));
  assert.equal(presence.ready, false);
  presence.read(bytes.subarray(10));
  assert.equal(presence.ready, true);
  assert.equal(socket.destroyed, false);
});
