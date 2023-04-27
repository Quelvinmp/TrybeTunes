/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    fontFamily: {
      sans: 'Secular One, sans-serif',
    },
    extend: {
      colors: {
        OxBlue: '#00072d',
      },
    },
  },
  plugins: [],
};
