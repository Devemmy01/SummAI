/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'zen': ['Zen Dots', 'sans-serif'],
        'Asul': ['Asul', 'sans-serif'],
      }
    },
  },
  plugins: [],
}