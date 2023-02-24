/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      sans: ["Source Sans Pro", "sans-serif"],
    },
    extend: {
      colors: {
        blue: "#153376",
        grey: "#4D4F5C",
        discord: {
          100: "#6789dd",
          200: "#527add",
        },
      },
    },
  },
  plugins: [],
};
