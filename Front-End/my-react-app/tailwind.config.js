// import { keyframes } from "framer-motion";

export default {
  content: [
    './src/**/*.{js,jsx,ts,tsx}', // Ensure all relevant file types are included
  ],
  theme: {
    extend: {
      fontFamily: {
        sister: ['"Love Ya Like A Sister"', 'cursive'],
        baloo: ['"Baloo"', 'cursive'],
        poppins: ['Poppins', 'sans-serif'],
      },
      keyframes: {
        slideIn: {
          '0%': { transform: 'translateX(700px)', opacity: 1 },
          '100%': { transform: 'translateX(0)', opacity: 1 },
        },
        slideOut: {
          '0%': { transform: 'translateX(-700px)', opacity: 1 },
          '100%': { transform: 'translateX(0)', opacity: 1 },
        },
        slideIndiv: {
          '0%': { transform: 'translateX(300px)', opacity:0 },
          '100%': { transform: 'translateX(0)', opacity: 1 },
        },
        slideOutdiv: {
          '0%': { transform: 'translateX(-300px)', opacity: 0 },
          '100%': { transform: 'translateX(0)', opacity: 1 },
        },
      },
      animation: {
        slideIn: 'slideIn 1s ease-in-out',
        slideOut: 'slideOut 1s ease-in-out',
        slideIndiv: 'slideIndiv 1s ease-in-out',
        slideOutdiv: 'slideOutdiv 1s ease-in-out',
      },
    },
  },
  plugins: [],
}