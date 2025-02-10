/** @type {import('tailwindcss').Config} */
export default {
  mode: 'jit',
  content: [
    './public/**/*.html',
    './src/**/*.{js,jsx,ts,tsx,vue}',
  ],
  theme: {
    extend: {
      colors: {
        primary : {
          "dark": "#0D1625",
          "light": "#F1F9FF",
          "dark-lighten": "#1A2438",
        },
        secondary: {
          "dark": "#ACDCFF",
          "light": "#D6EDFF",
        },
        accent: "#FFC633",
        form: {
          "input": "#0A121E",
          "placeholder": "#ACDCFF",
        },
      },
    },
  },
  plugins: [],
}