/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // <--- THIS IS CRITICAL
  theme: {
    extend: {
      colors: {
        primary: '#169ca3', 
        secondary: '#ff5a5f',
        dark: '#1f2937',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'], 
      }
    },
  },
  plugins: [],
}