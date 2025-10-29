/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#1677ff",
        dark: "#0f111a",
        background: "#f9fafb",
      },
    },
  },
  plugins: [],
};
