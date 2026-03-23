import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["Sora", "Segoe UI", "sans-serif"],
        body: ["IBM Plex Sans", "Segoe UI", "sans-serif"]
      },
      boxShadow: {
        panel: "0 16px 48px rgba(0, 0, 0, 0.35)"
      }
    }
  },
  plugins: []
} satisfies Config;
