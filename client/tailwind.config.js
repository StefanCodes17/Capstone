module.exports = {
  mode: "jit",
  content: ["./public/**/*.html", "./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: 'media',
  theme: {
    extend: {
      colors:{
        primary_color: "rgb(35, 35, 35)",
      },
      keyframes: {
        fadeIn: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        }
      },
      animation:{
        fadeIn: 'fadeIn 5s infinite'
      }
    },
  },
  plugins: [],
}
