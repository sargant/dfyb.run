import React from '@vitejs/plugin-react'
import Icons from 'unplugin-icons/vite'
import { defineConfig } from 'vite'
import WindiCSS from 'vite-plugin-windicss'

export default defineConfig({
  root: 'web',
  plugins: [
    React(),
    Icons({ compiler: 'jsx', jsx: 'react' }),
    WindiCSS()
  ],
  publicDir: './assets'
})
