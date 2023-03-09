/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    
    extend: {
      fontFamily:{
        'lora':['Poppins', 'sans-serif'],
        'noto':['Noto Sans', 'sans-serif'],
        'pro':['Source Sans Pro', 'sans-serif'],
        'fair':['Prompt','sans-serif'],
        'open':['Open Sans', 'sans-serif'],
        'lato':['Lato', 'sans-serif']
      }
    },
  },
  plugins: [],
}
