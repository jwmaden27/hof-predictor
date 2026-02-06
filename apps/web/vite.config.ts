import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    proxy: {
      '/nhl-api': {
        target: 'https://api-web.nhle.com',
        changeOrigin: true,
        rewrite: (p) => p.replace(/^\/nhl-api/, ''),
      },
      '/nhl-search-api': {
        target: 'https://search.d3.nhle.com',
        changeOrigin: true,
        rewrite: (p) => p.replace(/^\/nhl-search-api/, ''),
      },
    },
  },
})
