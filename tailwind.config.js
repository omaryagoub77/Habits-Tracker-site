/** @type {import('tailwindcss').Config} */
// NOTE: Tailwind v4 is configured primarily through the `@theme` block in
// src/index.css. This file is kept in sync so any tooling that reads the JS
// config (and any legacy utility usage) resolves to the same violet tokens.
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Brand — violet accent system
        primary: "#785de8",
        "primary-pressed": "#6348d5",
        "accent-light": "#9b5df0",
        "accent-soft": "#a99af7",
        "accent-tint": "#211a3d",
        "accent-border": "#51418c",
        // Dark surfaces
        "background-dark": "#090909",
        surface: "#131313",
        "surface-elevated": "#1c1c1c",
        "surface-pressed": "#242424",
        "card-dark": "#161618",
        divider: "#292929",
        // Light surfaces
        "background-light": "#f5f5f8",
        "surface-light": "#ffffff",
        "border-light": "#e5e2ec",
        // Text
        ink: "#f5f5f7",
        "ink-secondary": "#a1a1aa",
        "ink-muted": "#73737d",
        // Semantic
        success: "#3ddc84",
        warning: "#f5b544",
        danger: "#ff5c5c",
        info: "#785de8",
      },
      fontFamily: {
        display: ["Inter", "sans-serif"],
      },
      borderRadius: {
        card: "22px",
        sheet: "28px",
      },
    },
  },
  plugins: [],
}
