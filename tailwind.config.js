/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bg-dark': '#0a0a0b',
        'bg-darker': '#050505',
        'accent-gold': '#c5a059',
        'accent-gold-light': '#e0c08d',
      },
      fontFamily: {
        'main': ['Outfit', 'sans-serif'],
        'display': ['Playfair Display', 'serif'],
      },
    },
  },
  plugins: [],
}
