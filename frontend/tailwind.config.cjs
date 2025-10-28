/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#eff6ff",
          100: "#dbeafe",
          200: "#bfdbfe",
          300: "#93c5fd",
          400: "#60a5fa",
          500: "#3b82f6",
          600: "#2563eb",
          700: "#1d4ed8",
          800: "#1e40af",
          900: "#172554",
        },
        accent: {
          50: "#fff7ed",
          100: "#ffedd5",
          200: "#fed7aa",
          300: "#fdba74",
          400: "#fb923c",
          500: "#f97316",
        },
        bg: "var(--color-bg)",
        card: "var(--color-card)",
        borderc: "var(--color-border)",
        muted: "var(--color-muted)",
        fg: "var(--color-foreground)",
      },
      boxShadow: {
        glass:
          "0 6px 18px -6px rgba(16,24,40,0.12), 0 2px 6px -4px rgba(16,24,40,0.06)",
      },
      borderRadius: {
        lg2: "14px",
      },
    },
  },
  plugins: [],
};
