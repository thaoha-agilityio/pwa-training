import type { ManifestOptions } from 'vite-plugin-pwa';

export const MANIFEST_OPTIONS: Partial<ManifestOptions> = {
  name: 'Price Gold PWA App',
  short_name: 'PriceGold',
  description: 'A Progressive Web App built with React and Vite',
  start_url: '/',
  scope: '/',
  display: 'standalone',
  orientation: 'portrait-primary',
  theme_color: '#000000',
  background_color: '#ffffff',
  lang: 'en',
  dir: 'ltr',
  categories: ['productivity', 'utilities'],
  icons: [
    {
      src: '/pwa-64x64.png',
      sizes: '64x64',
      type: 'image/png',
    },
    {
      src: '/pwa-192x192.png',
      sizes: '192x192',
      type: 'image/png',
    },
    {
      src: '/pwa-512x512.png',
      sizes: '512x512',
      type: 'image/png',
    },
  ],
  shortcuts: [
    {
      name: 'Home',
      short_name: 'Home',
      description: 'Go to the home page',
      url: '/',
      icons: [
        {
          src: '/pwa-192x192.png',
          sizes: '192x192',
          type: 'image/png',
        },
      ],
    },
  ],
  related_applications: [],
  prefer_related_applications: false,
};
