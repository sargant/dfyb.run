import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import WindiCSS from 'vite-plugin-windicss'

export default defineConfig({
  root: './web',
  publicDir: './assets',
  plugins: [WindiCSS(), react()],
  resolve: {
    alias: [{ find: '@', replacement: __dirname }]
  }
})
