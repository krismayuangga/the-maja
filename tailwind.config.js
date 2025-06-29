/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        majaGold: '#b08d57',
        majaYellow: '#ffd700',
        majaRed: '#6e2639',
        majaBrick: '#a94442',
        majaDark: '#2a1a3a',
        majaBronze: '#8c6239',
      },
      fontFamily: {
        serif: ['Merriweather', 'serif'],
        sans: ['Inter', 'Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
