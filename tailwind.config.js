/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        space: {
          950: '#03030f',
          900: '#07071a',
          800: '#0d0d2b',
          700: '#141436',
          600: '#1e1e4a',
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.45s ease-out',
        'slide-up': 'slideUp 0.4s ease-out',
        'float': 'float 8s ease-in-out infinite',
        'orb1': 'orbFloat1 22s ease-in-out infinite',
        'orb2': 'orbFloat2 28s ease-in-out infinite',
        'spin-slow': 'spin 3s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(18px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-18px)' },
        },
        orbFloat1: {
          '0%, 100%': { transform: 'translate(0,0) scale(1)' },
          '33%': { transform: 'translate(40px,-40px) scale(1.06)' },
          '66%': { transform: 'translate(-25px, 30px) scale(0.94)' },
        },
        orbFloat2: {
          '0%, 100%': { transform: 'translate(0,0) scale(1)' },
          '33%': { transform: 'translate(-50px, 30px) scale(0.95)' },
          '66%': { transform: 'translate(35px,-50px) scale(1.05)' },
        },
      },
    },
  },
  plugins: [],
}
