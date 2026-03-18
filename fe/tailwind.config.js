/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#FFD60A',
          dark: '#E6C000',
        },
        studio: {
          DEFAULT: '#FF4500',
          dark: '#CC3700',
        },
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'sans-serif'],
        studio: ['Bebas Neue', 'sans-serif'],
      },
    },
  },
  plugins: [],
}