import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import { cpSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';

/**
 * index.html ships a no-build runtime block (Babel-in-browser + import map) so the site
 * also works on plain static hosting. Under Vite we swap it for the standard module
 * entry and copy /images + favicon into the build output.
 */
function staticRuntimeSwap(): Plugin {
  return {
    name: 'arnotech-runtime-swap',
    // Runs in the "pre" phase so vite:build-html scans the swapped entry
    // (/src/main.tsx) instead of the no-build runtime's loader.js.
    transformIndexHtml: {
      order: 'pre',
      handler(html) {
        return html.replace(/<!-- runtime:start -->[\s\S]*?<!-- runtime:end -->/, '<script type="module" src="/src/main.tsx"></script>');
      }
    },
    closeBundle() {
      const imgs = resolve(__dirname, 'images');
      if (existsSync(imgs)) cpSync(imgs, resolve(__dirname, 'dist/images'), { recursive: true });
      const fav = resolve(__dirname, 'favicon.svg');
      if (existsSync(fav)) cpSync(fav, resolve(__dirname, 'dist/favicon.svg'));
    }
  };
}

export default defineConfig({
  base: './',
  publicDir: false,
  plugins: [react(), staticRuntimeSwap()]
});
