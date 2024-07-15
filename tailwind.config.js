/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        lg: { min: "768px" },
        md: { max: "767px" },
        sm: { max: "320px" },
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      keyframes: {
        slideIn: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(0%)" },
        },
        slideOut: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-100%)" },
        },
        // Add other custom keyframes here
      },
      animation: {
        slideIn: "slideIn 0.5s ease-out forwards",
        slideOut: "slideOut 0.5s ease-in forwards",
        // Add other custom animations here
      },
      backgroundImage: {
        "hero-pattern": "url('/src/assets/message.png')",
        "dark-bg": "url('/src/assets/darkbg.png')",
      },
    },
  },
  plugins: [],
};
