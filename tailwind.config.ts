/** @type {import('tailwindcss').Config} */
/* eslint-disable import/no-default-export */
import defaultTheme from "tailwindcss/defaultTheme";

export default {
  content: ["./src/**/*.{html,js,ts}"],
  theme: {
    screens: {
      xs: { max: "432px" },
      ...defaultTheme.screens,
    },
    extend: {
      colors: {
        primary: "#b81f25",
        secondary: "#F4F3F2",
        contrast: "#f6c86b",
        dark: "#395666",
        light: "#FAFAFA",
        offWhite: "#194569",
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
