export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      keyframes: {
        scan: {
          '0%': { left: '-100%' },
          '100%': { left: '200%' },
        }
      },
      animation: {
        scan: 'scan 2s linear infinite',
      },
      colors: {
        "primary": "#8ed5ff", // Cyber Blue
        "secondary": "#4ae176", // Security Green
        "tertiary": "#ffbcbf", // Alert Red
        "background": "#081425",
        "surface": "#081425",
        "surface-bright": "#2f3a4c",
        "surface-container": "#152031",
        "on-surface": "#d8e3fb",
        "on-surface-variant": "#bdc8d1",
        "outline": "#87929a",
        "outline-variant": "#3e484f",
      },
      fontFamily: {
        mono: ['"JetBrains Mono"', 'monospace'],
        sans: ['Inter', 'sans-serif'],
      },
      borderRadius: {
        'none': '0',
      }
    },
  },
  plugins: [],
}
