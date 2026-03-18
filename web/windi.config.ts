import colors from "windicss/colors";
import { defineConfig } from "windicss/helpers";

export default defineConfig({
  darkMode: "media",
  plugins: [require("windicss/plugin/forms")],
  extract: {
    include: ["**/*.{jsx,js,tsx,ts,css,html}"],
    exclude: ["node_modules", ".git"],
  },
  theme: {
    extend: {
      colors: {
        primary: "#204C72",
        secondary: "#ECD95F",
        warning: "#D36525",
        success: "#59C9A5",
        gray: colors.neutral,
      },
      fontFamily: {
        header: ['"Barlow Semi Condensed"', "sans-serif"],
      },
    },
  },
});
