import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#040D1A",
        card: "#0D253F",
        cardBorder: "rgba(0, 194, 255, 0.3)",
        cyberBlue: "#00C2FF",
        cyberPurple: "#7B61FF",
        cyberGreen: "#00E676",
        cyberRed: "#FF4D4D",
        cyberYellow: "#FFB800",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "sans-serif"],
        orbitron: ["var(--font-orbitron)", "Orbitron", "sans-serif"],
        mono: ["Consolas", "Monaco", "monospace"],
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow-spin': 'spin 12s linear infinite',
      },
    },
  },
  plugins: [],
};

export default config;
