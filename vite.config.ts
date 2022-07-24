import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    svelte(),
    VitePWA({ 
      registerType: 'autoUpdate',
      includeAssets: ['favicon.png', 'logo.svg', 'global.css', 'icons/apple-touch-icon.png'],
      manifest: {
        name: 'VT Next Evry',
        short_name: 'VT Next',
        description: 'VT Next',
        theme_color: '#c8c8c8',
        icons: [
          {
            src: 'icons/android-chrome-192x192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any maskable'
          },
          {
            src: 'icons/android-chrome-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'
          }
        ]
      }
    })
  ]
})
