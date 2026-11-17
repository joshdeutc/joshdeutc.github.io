import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        washi: "#F5F3EE",
        "washi-alt": "#ECE8DF",
        paper: "#FAF8F4",
        ink: "#111111",
        hanko: "#D62828",
        "hanko-dark": "#B31B1B",
        slateink: "#4D4B46",
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        sans: ["var(--font-sans)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
        jp: ["var(--font-jp)", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
