/** @type {import('tailwindcss').Config} */
/* eslint-disable import/no-default-export */
export default {
  content: ['./src/**/*.{html,js,ts}'],
  theme: {
    extend: {
      colors: {
        'bg-primary': '#f25454',
        'bg-secondary': '#eff5ff',
        'bg-dark': '#1b2c51',
      },
    },
  },
  plugins: [],
};
