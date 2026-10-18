import { defineConfig } from 'vite';
export default defineConfig({
  root: 'site',
  base: './',
  publicDir: '../public',
  build: { outDir: '../dist', emptyOutDir: true, target: 'es2022' },
});
