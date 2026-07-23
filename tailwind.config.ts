import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: "#171719",
        canvas: "#f5f5f7",
      },
      boxShadow: {
        card: "0 18px 50px rgba(0, 0, 0, 0.08)",
      },
    },
  },
  plugins: [],
};

export default config;
