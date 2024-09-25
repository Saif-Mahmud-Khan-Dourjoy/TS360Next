/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./app/**/*.{js,jsx}",
    "./src/**/*.{js,jsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      fontFamily: {
        pacifico: ["Pacifico", "cursive"],
        poppins: ["Poppins", "sans-serif"],
      },
      boxShadow: {
        homeButtom:
          "0px 61px 17px 0px rgba(0, 0, 0, 0.00), 0px 39px 16px 0px rgba(0, 0, 0, 0.01), 0px 22px 13px 0px rgba(0, 0, 0, 0.04), 0px 10px 10px 0px rgba(0, 0, 0, 0.07), 0px 2px 5px 0px rgba(0, 0, 0, 0.08)",
        cardShadow:
          "0px -6px 14px 0px rgba(0, 0, 0, 0.10), 0px 22px 22px 0px rgba(87, 87, 87, 0.09), 0px 5px 12px 0px rgba(87, 87, 87, 0.10)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
