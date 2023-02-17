/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    
    extend: {
      width:{
        '90': '21.25rem',
        '95': '22rem',
      },
      fontFamily: {
        inter: ["Inter", "sans-serif"],
      },
      fontSize:{
        '2.9xl': '1.75rem',
      }
    },
  },
  plugins: [],
};
