import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-geist-sans)", ...fontFamily.sans],
      },
      boxShadow: {
        'elevation-low': '0px 0px 1px rgba(0, 0, 0, 0.32), 0px 0px 2px rgba(0, 0, 0, 0.08), 0px 1px 3px rgba(0, 0, 0, 0.08)',
        'elevation-medium': '0px 0px 1px 0px rgba(0, 0, 0, 0.24), 0px 0px 10px 0px rgba(0, 0, 0, 0.08), 0px 2px 4px 0px rgba(0, 0, 0, 0.08)',
        'elevation-high': '0px 0px 1px rgba(0, 0, 0, 0.24), 0px 0px 2px rgba(0, 0, 0, 0.16), 0px 3px 4px rgba(0, 0, 0, 0.06), 0px 6px 8px rgba(0, 0, 0, 0.06), 0px 12px 16px rgba(0, 0, 0, 0.08), 0px 18px 32px rgba(0, 0, 0, 0.06)',
      },
      colors: {
        'red-dusty': '#99465a',
        'red-dusty-dark': '#8a3e52'
      }
    },
  },
  plugins: [],
} satisfies Config;
