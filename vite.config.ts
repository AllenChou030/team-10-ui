// vite.config.js
import { defineConfig } from 'vite';
import { nodePolyfills } from 'vite-plugin-node-polyfills';

export default defineConfig({
  ...(process.env.NODE_ENV === 'development'
    ? {
      define: {
        global: {},
      },
    }
    : {}),
  resolve: {
    alias: {
      ...(process.env.NODE_ENV !== 'development'
        ? {
          './runtimeConfig': './runtimeConfig.browser', //fix production build
        }
        : {}),
    },
  },
});