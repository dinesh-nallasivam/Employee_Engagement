/** @type {import('tailwindcss').Config} */
export default {
  content: [
     "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      boxShadow:{
        "login-shadow":"1px 1px 3px 2px #8580e2",
        "sidebarshadow":'2px 0px 3px -2px rgba(0, 0, 0, 0.3)',
        "editcomponent":"0px 3px 8px 0px #00000026"
      },
      colors:{
        "primary":"#8580e2",
        "primarycolor":"#0554f2",
        "green":"#00aa00"
      },
      borderWidth:{
        "0.5":"0.5px"
      }
    },
  },
  plugins: [],
}

