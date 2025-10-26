import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
// base should point to the repository name for GitHub Pages project pages
export default defineConfig({
  base: '/mithila-crunch-ui/',
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  server: {
    host: '::',
    port: 3000,
  },
})
