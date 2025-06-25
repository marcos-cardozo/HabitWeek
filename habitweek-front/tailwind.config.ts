import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      transitionProperty: {
        colors: "color, background-color, border-color",
      },
      colors: {
        fondo: {
          light: "#F8FAFC",
          dark: "#0F172A",
        },
        texto: {
          light: "#0F172A",
          dark: "#F8FAFC",
        },
        primario: {
          light: "#3B82F6",
          dark: "#93C5FD",
        },
        secundario: {
          light: "#64748B",
          dark: "#CBD5E1",
        },
      },
    },
  },
  plugins: [],
};

export default config;
