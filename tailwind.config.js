/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {
      fontFamily: {
        'roboto': ['Roboto-Regular', 'sans-serif']
      },
      colors: {
        'primary': '#8758FF',
        'secondary': '#5CB8E4',
        'light': '#F2F2F2',
        'dark': '#181818'
      }
    },
  },
  plugins: [],
}
