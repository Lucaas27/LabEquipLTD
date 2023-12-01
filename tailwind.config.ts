/** @type {import('tailwindcss').Config} */
/* eslint-disable import/no-default-export */
export default {
  content: ["./src/**/*.{html,js,ts}"],
  theme: {
    extend: {
      colors: {
        primary: "#da5258",
        secondary: "#D2E9F8",
        contrast: "#f6c86b",
        dark: "#395666",
        light: "#FAFAFA",
        offWhite: "#F4F3F2",
      },
      screens: {
        widescreen: { raw: "(min-aspect-ratio: 3/2)" },
        tallscreen: { raw: "(min-aspect-ratio: 13/20)" },
      },
      keyframes: {
        "open-menu": {
          "0%": { transform: "scaleY(0)" },
          "80%": { transform: "scaleY(1.2)" },
          "100%": { transform: "scaleY(1)" },
        },
        slide: {
          from: { transform: "translateX(0)" },
          to: {
            transform: "translateX(-100%)",
          },
        },
      },
      animation: {
        "open-menu": "open-menu 0.5s ease-in-out forwards",
        slide: "slide 25s linear infinite",
      },
    },
  },
  plugins: [],
};
