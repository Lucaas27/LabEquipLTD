/** @type {import('tailwindcss').Config} */
/* eslint-disable import/no-default-export */
export default {
  content: ['./src/**/*.{html,js,ts}'],
  theme: {
    extend: {
      colors: {
        primary: '#F25454',
        secondary: '#d2e9f8',
        contrast: '#E8A564',
        dark: '#395666',
        light: '#FAFAFA',
        offWhite: '#F4F3F2',
      },
    },
  },
  plugins: [],
};
