/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        ["off-white"]: "#f1ebe5",
        taupe: "#473c38",
        ["taupe-light"]: "#7a6c65",
        ["taupe-dark"]: "#2e2623",
      },
    },
  },
  plugins: [],
};
