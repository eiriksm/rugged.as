/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './build-scripts/template.html',
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
