/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    colors: {
      primary: '#4500AD',
      gray: '#F6F6F6',
      gray_text: "#394154",
      gray_button_disabled: "#A7A7A7"
    },
    fontFamily: {
      'montserrat': ['Montserrat']
    }
  },
  plugins: [],
}

