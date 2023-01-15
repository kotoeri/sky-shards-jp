import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';
import manifest from './manifest';

console.log('Version', process.env.VITE_VERSION_MINOR);
console.log('Branch', process.env.BRANCH);
console.log('Commit Ref', process.env.COMMIT_REF);
console.log('Netlify CDN', process.env.NETLIFY_IMAGES_CDN_DOMAIN);

// https://vitejs.dev/config/
export default defineConfig({
  define: {
    __NETLIFY_GIT_BRANCH__: `'${process.env.BRANCH}'`,
    __NETLIFY_GIT_COMMIT_REF__: `'${process.env.COMMIT_REF}'`,
  },
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'robots.txt', 'backgrounds/*', 'icons/*'],
      manifest,
      workbox: {
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-stylesheets',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365,
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
          {
            urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-webfonts',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365,
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
          //Not just images though. This is a catch all for all netlify cdn domains
          process.env.NETLIFY_IMAGES_CDN_DOMAIN && {
            //Replace all . with \. to make it a regex
            urlPattern: new RegExp(`^https://${process.env.NETLIFY_IMAGES_CDN_DOMAIN.replace(/\./g, '\\.')}/.*`, 'i'),
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'netlify-cdn',
              backgroundSync: {
                name: 'netlify-cdn-queue',
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
        ],
      },
    }),
  ],
});
