module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        basic: "#edeef7",
        primary: {
          50: "#ebf5f6",
          100: "#d7eaed",
          200: "#c3e0e4",
          300: "#afd5db",
          400: "#9bcbd2",
          500: "#87c1c8",
          600: "#73b6bf",
          700: "#5facb6",
          800: "#4ba1ad",
          900: "#3797a4",
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
