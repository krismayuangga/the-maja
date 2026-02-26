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
        'deep-brown': '#2C1A12',
        'antique-gold': '#C6A75E',
        'ivory': '#F5EBDD',
        'dark-emerald': '#0F3B2E',
        'charcoal': '#1A1A1A',
        'gold-light': '#D4B978',
        'warm-amber': '#B8860B',
      },
      fontFamily: {
        serif: ['Cinzel', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Cormorant Garamond', 'serif'],
      },
    },
  },
  plugins: [],
};
