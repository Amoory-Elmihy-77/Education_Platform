/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "var(--accent-primary)",
        secondary: "var(--accent-secondary)",
        background: "var(--bg-primary)",
        surface: "var(--bg-secondary)",
        text: {
          primary: "var(--text-primary)",
          secondary: "var(--text-secondary)",
        }
      }
    },
  },
  plugins: [],
}
