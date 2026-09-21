/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: '#2d3a2e',
          green: '#3d5a3e',
          light: '#f5f3ef',
          cream: '#faf8f5',
        },
        navy: {
          900: '#0f172a',
          800: '#1e293b',
          700: '#334155',
          600: '#475569',
        },
        teal: {
          500: '#14b8a6',
          600: '#0d9488',
          700: '#0f766e',
        },
      },
      fontFamily: {
        'helvetica-neue': ['"Helvetica Neue Light"', 'Helvetica', 'Arial', 'sans-serif'],
        'playfair': ['"Playfair Display"', 'serif'],
        'oswald': ['"Oswald"', 'sans-serif'],
        'montserrat': ['"Montserrat"', 'sans-serif'],
        'roboto-slab': ['"Roboto Slab"', 'serif'],
        'raleway': ['"Raleway"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}