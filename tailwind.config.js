/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontFamily: {
      amaldeSans: ["amalde-sans"],
      amalde: ["amalde-regular"],
      happy: ["happy"],
      icozoom: ["icozoom"],
    },
    extend: {
      colors: {
        dullWhite: "#F7F9FA",
        dullBlue: "#0E72ED",
        dullGray: "#666484",
        paleBlue: "#36518F",
        blueSky: "#E8F3FF",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
