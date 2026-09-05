import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        nola: {
          cream: "#FFF5EC",
          brown: "#2A1712",
          red: "#B73A24",
        },
      },
      boxShadow: {
        soft: "0 20px 60px rgba(42,23,18,.12)",
      },
    },
  },
  plugins: [],
};

export default config;
