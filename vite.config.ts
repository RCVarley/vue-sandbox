import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      template: {
        compilerOptions: {
          isCustomElement: (tag) =>
            tag === 'el-stack' ||
            tag === 'el-box' ||
            tag === 'el-center' ||
            tag === 'el-cluster' ||
            tag === 'el-sidebar' ||
            tag === 'el-switcher' ||
            tag === 'el-cover' ||
            tag === 'el-grid' ||
            tag === 'el-frame' ||
            tag === 'el-reel' ||
            tag === 'el-imposter' ||
            tag === 'el-icon',
        },
      },
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
});
