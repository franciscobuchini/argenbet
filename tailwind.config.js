// tailwind.config.js
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}", // necesario para detectar las clases
  ],
  theme: {
    extend: {
      fontFamily: {
        clash: ["ClashGrotesk", "sans-serif"],
      },
    },
  },
  plugins: [],
}
