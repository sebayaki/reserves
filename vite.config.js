import { defineConfig } from 'vite';
import { seoPlugin } from './scripts/seo.mjs';
export default defineConfig({
  root: 'site',
  plugins: [seoPlugin()],
  base: './',
  publicDir: '../public',
  build: { outDir: '../dist', emptyOutDir: true, target: 'es2022' },
});
