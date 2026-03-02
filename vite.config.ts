import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'zamani-icon-192.png', 'zamani-icon-512.png'],
      manifest: {
        name: 'Zamani — African Markets Terminal',
        short_name: 'Zamani',
        description: 'Real-time African stock market data terminal',
        theme_color: '#0a0a0a',
        background_color: '#0a0a0a',
        display: 'standalone',
        orientation: 'landscape',
        icons: [
          { src: '/zamani-icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: '/zamani-icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any maskable' },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2}'],
        runtimeCaching: [
          {
            // Cache API responses for 1 minute
            urlPattern: /^https:\/\/(api\.twelvedata\.com|eodhd\.com\/api)/,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'market-data',
              expiration: { maxAgeSeconds: 60, maxEntries: 200 },
            },
          },
        ],
      },
    }),
  ],
  resolve: {
    alias: { '@': '/src' },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Split recharts into its own chunk — keeps main bundle lean
          recharts: ['recharts'],
          // Split router + query into vendor chunk
          vendor: ['react-router-dom', '@tanstack/react-query'],
          // Split zustand
          store: ['zustand'],
        },
      },
    },
  },
})
