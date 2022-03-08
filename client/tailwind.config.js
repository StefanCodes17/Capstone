module.exports = {
  mode: "jit",
  content: ["./public/**/*.html", "./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: 'media',
  theme: {
    extend: {
          colors:{
      primary_color: "rgb(35, 35, 35)",
    },
    },
  },
  plugins: [],
}
