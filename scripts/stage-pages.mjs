import { cp, rm, access } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { join } from 'node:path';
const root = fileURLToPath(new URL('../', import.meta.url));
const output = join(root, 'dist');
await access(join(output, 'index.html'));
// This directory contains only the generated, content-hashed Vite output.
await rm(join(root, 'assets'), { recursive: true, force: true });
await cp(output, root, { recursive: true });
console.log('Staged static output in the repository root for GitHub Pages.');
