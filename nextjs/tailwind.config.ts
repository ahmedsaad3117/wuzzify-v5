import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "var(--font-inter, var(--font-cairo))",
          "var(--font-cairo)",
          "system-ui",
          "sans-serif",
        ],
      },
      colors: {
        brand: {
          50:  "#F7F4FC",
          100: "#EFEAF8",
          200: "#D9CFEF",
          300: "#B9A8E6",
          400: "#8058E0",
          500: "#6E55B4",
          600: "#4C3491", // primary
          700: "#3B286F",
          800: "#2E1F66",
          900: "#1C133F",
        },
        ink: {
          DEFAULT: "#14111F",
          2: "#4A4659",
          3: "#7A7588",
        },
        line: "#E4E1EE",
        wash: "#FAF8FD",
      },
      boxShadow: {
        card: "0 1px 0 rgba(20,17,31,0.04), 0 2px 8px rgba(20,17,31,0.04)",
        lift: "0 14px 40px -12px rgba(76,52,145,0.20), 0 2px 8px rgba(20,17,31,0.04)",
        glow: "0 24px 60px -20px rgba(76,52,145,0.35)",
      },
      borderRadius: {
        xs: "3px",
      },
      backgroundImage: {
        "brand-gradient":
          "linear-gradient(135deg,#FFFFFF 0%,#EFEAF8 38%,#B9A8E6 72%,#4C3491 100%)",
      },
      animation: {
        ticker: "ticker 38s linear infinite",
        "pulse-dot": "pulse-dot 1.6s ease-in-out infinite",
      },
      keyframes: {
        ticker: {
          from: { transform: "translateX(0)" },
          to:   { transform: "translateX(50%)" },
        },
        "pulse-dot": {
          "0%,100%": { transform: "scale(1)", opacity: "1" },
          "50%":     { transform: "scale(1.4)", opacity: "0.5" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
