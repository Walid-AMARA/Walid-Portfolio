/** @type {import('tailwindcss').Config} */
// tailwind.config.js
module.exports = {
  darkMode: 'class', // <--- important for toggling
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./public/**/*.{html,js}",
  ],
  theme: {
    extend: {
      fontFamily: {
        heading: ['"Playfair Display"', 'serif'],
        body: ['Montserrat', 'sans-serif'],
      },
      colors: {
        grayish: {
          100: '#f7f7f7',
          200: '#eeeeee',
          300: '#e0e0e0',
          700: '#4a4a4a',
        },
        gold: '#c9a24f',
      },
      animation: {
        'dust-fade': 'dustFade 1s linear forwards',
        'fade-in-up': 'fadeInUp 0.8s ease-in-out forwards',
      },
      keyframes: {
        dustFade: {
          '0%': { opacity: 1 },
          '100%': { opacity: 0, transform: 'translateY(-20px)' },
        },
        fadeInUp: {
          '0%': { opacity: 0, transform: 'translateY(20px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};
