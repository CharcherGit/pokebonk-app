// Copies the client's source into a checkout of CharcherGit/pokebonk-app (docs/DESKTOP.md, «Publicar una versión»), where GitHub
// Actions builds the three systems. `npm run sync:repo -- <path to the checkout>`; its README.md stays as it is.
import { cpSync, rmSync, existsSync } from 'node:fs';
import { join } from 'node:path';
const dest = process.argv[2];
if (!dest || !existsSync(join(dest, '.git'))) { console.error('Usage: npm run sync:repo -- <checkout of pokebonk-app>'); process.exit(1); }
const items = ['src', 'static', 'build', '.github', '.gitignore', 'package.json', 'package-lock.json', 'tsconfig.json', 'electron-builder.yml', 'sync-repo.mjs'];
for (const it of items) {
  rmSync(join(dest, it), { recursive: true, force: true });
  cpSync(it, join(dest, it), { recursive: true });
}
console.log(`Copied ${items.length} items to ${dest}`);
