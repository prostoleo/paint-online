import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import WindiCSS from 'vite-plugin-windicss';
import Icons from 'unplugin-icons/vite';
// import Unocss from '@unocss/vite';
// import presetIcons from '@unocss/preset-icons';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    WindiCSS(),
    Icons({
      compiler: 'vue3',
    }),
    /*  Unocss({
      // presets: [presetIcons()],
      // mode: 'vue-scoped',
    }), */
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
});
