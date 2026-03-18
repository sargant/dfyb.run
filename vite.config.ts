import React from '@vitejs/plugin-react'
import Icons from 'unplugin-icons/vite'
import { defineConfig } from 'vitest/config'
import WindiCSS from 'vite-plugin-windicss'

export default defineConfig({
  root: process.env.VITEST ? '.' : 'web',
  plugins: [
    React(),
    Icons({ compiler: 'jsx', jsx: 'react' }),
    WindiCSS()
  ],
  publicDir: './assets',
  test: {
    include: ['**/*.test.{ts,tsx}']
  }
})
