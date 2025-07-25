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
          50: '#1a1a1a',
          100: '#2d2d2d',
          200: '#404040',
          300: '#525252',
          400: '#737373',
          500: '#a3a3a3',
          600: '#d4d4d4',
          700: '#e5e5e5',
          800: '#f5f5f5',
          900: '#fafafa',
        },
        accent: {
          50: '#0f0f23',
          100: '#1e1e3f',
          200: '#2d2d5c',
          300: '#3c3c78',
          400: '#4b4b95',
          500: '#5a5ab1',
          600: '#7575c1',
          700: '#9090d1',
          800: '#ababe1',
          900: '#c6c6f0',
        },
        gold: {
          50: '#1a1611',
          100: '#332c22',
          200: '#4d4233',
          300: '#665844',
          400: '#806e55',
          500: '#998466',
          600: '#b39a77',
          700: '#ccb088',
          800: '#e6c699',
          900: '#ffdcaa',
        },
        dark: {
          50: '#0a0a0a',
          100: '#141414',
          200: '#1e1e1e',
          300: '#282828',
          400: '#323232',
          500: '#3c3c3c',
          600: '#464646',
          700: '#505050',
          800: '#5a5a5a',
          900: '#646464',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Playfair Display', 'serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-in-out',
        'slide-up': 'slideUp 0.8s ease-out',
        'scale-in': 'scaleIn 0.4s ease-out',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(30px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.9)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(153, 132, 102, 0.3)' },
          '100%': { boxShadow: '0 0 30px rgba(153, 132, 102, 0.6)' },
        },
      },
      backdropBlur: {
        xs: '2px',
      }
    },
  },
  plugins: [],
}
