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
          cream: "#FFF7EA",
          sand: "#F2E3CC",
          brown: "#40261D",
          red: "#8F2D1E",
          gold: "#D99C48",
          green: "#315C44",
        },
      },
      boxShadow: {
        soft: "0 20px 60px rgba(64,38,29,.10)",
      },
    },
  },
  plugins: [],
};

export default config;
