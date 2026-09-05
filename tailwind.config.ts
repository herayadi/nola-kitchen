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
          cream: "#FFF7EE",
          brown: "#211410",
          red: "#D84A2F",
        },
      },
      boxShadow: {
        soft: "0 14px 40px rgba(33,20,16,.10)",
        drawer: "-24px 0 80px rgba(33,20,16,.18)",
      },
    },
  },
  plugins: [],
};

export default config;
