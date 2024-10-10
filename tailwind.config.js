/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background:"#f1f3f4",
        secondarybackground:"#f5f5f5",
        headercolor:"#5f6368",
          texttcolor:"#3c4043",
      }

      
    },
  },
  plugins: [],
}