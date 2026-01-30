/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#1d6f42', // Main mosque green
          600: '#165c37',
          700: '#0f472c',
          800: '#0a3520',
          900: '#052615',
        },
        accent: {
          50: '#f9f6f0',
          100: '#f0e9d6',
          200: '#decfa8',
          300: '#c8ae73',
          400: '#ae8c48',
          500: '#8c6c21', // Burnished Premium Gold
          600: '#73571a',
          700: '#594414',
          800: '#40300e',
          900: '#261c08',
        },
        neutral: {
          50: '#fafaf9',
          100: '#f5f5f4',
          200: '#e7e5e4',
          300: '#d6d3d1',
          400: '#a8a29e',
          500: '#78716c',
          600: '#57534e',
          700: '#44403c',
          800: '#292524',
          900: '#1c1917',
        }
      },
      sans: ['Poppins', 'sans-serif'],
      display: ['Poppins', 'sans-serif'],
      arabic: ['Amiri', 'serif'],
      lato: ['Poppins', 'sans-serif'], // Redirect lato to Poppins just in case
    },
  },
  plugins: [],
}
