/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#6d5efc",
          600: "#5a4ae5",
          700: "#4838cf",
        },
      },
      container: { center: true, padding: "1rem" },
    },
  },
  plugins: [],
};
