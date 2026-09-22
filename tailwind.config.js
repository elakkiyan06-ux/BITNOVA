/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          navy: '#0B1B33',
          blue: '#2563EB',
          lightBlue: '#EFF6FF',
          bg: '#F4F7FB',
          text: '#172033',
          muted: '#64748B',
          green: '#10B981',
          red: '#DC2626',
          lightRed: '#FEF2F2',
          border: '#E2E8F0'
        },
        navy: {
          950: '#060f1e',
          900: '#0B1B33',
          800: '#11294d',
          700: '#1a3c70',
          600: '#235093',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
