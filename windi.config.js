import { defineConfig } from 'windicss/helpers'

export default defineConfig({
  darkMode: 'media',
  plugins: [
    require('windicss/plugin/forms'),
  ],
  extract: {
    include: ['**/*.{jsx,js,tsx,ts,css,html}'],
    exclude: ['node_modules', '.git'],
  },
  theme: {
    extend: {
      colors: {
        primary: '#204C72',
        secondary: '#ECD95F'
      },
      fontFamily: {
        header: ['"Barlow Semi Condensed"', 'sans-serif']
      }
    }
  }
})
