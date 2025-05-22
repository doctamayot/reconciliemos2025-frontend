// tailwind.config.js (Vuelve a esta estructura o similar)
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      // Asegúrate que la sección 'colors' personalizada sea eliminada de aquí
    },
  },
  plugins: [],
};
