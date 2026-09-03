/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        dark: {
          bg: "#242625",
          surface: "#383a39",
          border: "#3a3a3a",
          text: "#f5f5f5",
          textMuted: "#c4c4c4",
          textSecondary: "#7a7a7a",
        },
        light: {
          bg: "#f5f0eb",
          surface: "#fffcfa",
          border: "#ddc8bd",
          text: "#1a1c1c",
          textMuted: "#594139",
          textSecondary: "#7a6058",
        },
      }
    },
  },
  plugins: [],
}
