import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        blue: "#2C5A9E",
        blueDark: "#1C3A66",
        blueLight: "#6A8FC1",
        green: "#2E7D32",
        greenDark:"#1B5E20",
        greenLight:"#4CAF50",
        orange: "#F97316",
        orangeDark:"#C05621",
        orangeLight:"#FB923C"
      },
    },
  },
  plugins: [],
} satisfies Config;
