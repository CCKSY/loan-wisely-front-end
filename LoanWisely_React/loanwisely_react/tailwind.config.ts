import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0f172a",
        mist: "#f3f4f6",
        ash: "#cbd5f5",
        sun: "#facc15",
      },
      boxShadow: {
        "soft-lg": "0 20px 60px -30px rgba(15, 23, 42, 0.45)",
      },
    },
  },
  plugins: [],
};

export default config;
