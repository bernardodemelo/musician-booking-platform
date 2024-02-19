/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        layout: "#f3f4f6",
        header: "#111827",
        primary: "#374151",
        lightBgOrange: "#fdf7f4",
        strongBgOrange: "#de6139",
        strongTextOrange: "#ab4b2c",
        lightBgGray: "#faf9fb",
        mdBgGray: "#f3f4f6",
        lightTextGray: "#e5e7eb",
        mdTextGray: "#9ca3af",
      },
    },
  },
  plugins: [],
};

