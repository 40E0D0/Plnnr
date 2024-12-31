/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        'fade-in': {
          '0%': {
            opacity: 0,
          },
          '100%': {
            opacity: 1,
          },
        },

        'fade-out': {
          '0%': {
            opacity: 1,
          },
          '100%': {
            opacity: 0,
          },
        },

        'slide-top': {
          '0%': {
            transform: 'translateY(-100px)',
            opacity: 0,

          },
          '100%': {
            transform: 'translateY(0px)',
            opacity: 1,
          },
        },

        'slide-bottom': {
          '0%': {
            transform: 'translateY(0)',
            opacity: 1,

          },
          '100%': {
            transform: 'translateY(-100px)',
            opacity: 0,
          },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.38s cubic-bezier(0.68, -0.55, 0.27, 1.55)',
        'fade-out': 'fade-out 0.38s cubic-bezier(0.68, -0.55, 0.27, 1.55)',
        'slide-top': 'slide-top 0.5s cubic-bezier(0.68, -0.55, 0.27, 1.55)',
        'slide-bottom': 'slide-bottom 0.5s cubic-bezier(0.68, -0.55, 0.27, 1.55)',
      },
      colors: {
      },
      screens: {
        'xs': '400px',
        '2xl': '1300px',
        '3xl': '1800px',
      },
    },
  },
  plugins: [],
}