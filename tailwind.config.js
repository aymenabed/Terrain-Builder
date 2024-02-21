module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false,
  theme: {
    extend: {
      colors: {
        "brand-blue": "#1992d4",
      },
      spacing: {
        128: "32rem",
        144: "36rem",
      },
    },
  },
  variants: {
    extend: {
      borderColor: ["focus-visible", "first"],
      opacity: ["disabled"],
    },
  },
  plugins: [],
};
