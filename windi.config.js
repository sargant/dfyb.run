import { defineConfig } from 'windicss/helpers'
import colors from 'windicss/colors'

export default defineConfig({
  darkMode: 'media',
  plugins: [
    require('windicss/plugin/forms')
  ],
  extract: {
    include: ['**/*.{jsx,js,tsx,ts,css,html}'],
    exclude: ['node_modules', '.git']
  },
  theme: {
    extend: {
      colors: {
        primary: '#204C72',
        secondary: '#ECD95F',
        gray: colors.trueGray
      },
      fontFamily: {
        header: ['"Barlow Semi Condensed"', 'sans-serif']
      }
    }
  }
})
