import { VitePWA } from 'vite-plugin-pwa';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import tailwindcss from '@tailwindcss/vite';

// config
import { GENERATE_SW_OPTIONS, MANIFEST_OPTIONS } from './src/config';

const envVariables = loadEnv('mock', process.cwd(), '');
// https://vitejs.dev/config/
export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
        'firebase-messaging-sw': path.resolve(
          __dirname,
          'src/sw/firebase-messaging-sw.js',
        ),
      },
      output: {
        entryFileNames: (chunkInfo) => {
          return chunkInfo.name === 'firebase-messaging-sw'
            ? '[name].js'
            : 'assets/[name]-[hash].js';
        },
      },
    },
  },
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: MANIFEST_OPTIONS,
      workbox: GENERATE_SW_OPTIONS(),
      devOptions: {
        enabled: false, // enable only for debugging in dev
      },
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  define: {
    'process.env.VITE_PUBLIC_API_URL': JSON.stringify(
      envVariables.VITE_PUBLIC_API_URL,
    ),
    'process.env.VITE_API_KEY': JSON.stringify(envVariables.VITE_API_KEY),
  },
});
