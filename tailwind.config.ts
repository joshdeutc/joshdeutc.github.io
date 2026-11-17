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
        washi: "#F3F4F6",
        paper: "#FFFFFF",
        ink: "#111111",
        hanko: "#D62828",
        "hanko-dark": "#B31B1B",
        slateink: "#4B5563",
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        sans: ["var(--font-sans)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
        jp: ["var(--font-jp)", "sans-serif"],
      },
      boxShadow: {
        manga: "5px 5px 0px 0px #111111",
        "manga-sm": "3px 3px 0px 0px #111111",
        "manga-lg": "8px 8px 0px 0px #111111",
        "manga-red": "5px 5px 0px 0px #D62828",
      },
    },
  },
  plugins: [],
};

export default config;
