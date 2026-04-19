/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#fef2f2',
          100: '#fee2e2',
          500: '#ef4444',
          600: '#dc2626',
          700: '#b91c1c',
          900: '#7f1d1d'
        },
        secondary: {
          50: '#eff6ff',
          100: '#dbeafe',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          900: '#1e3a8a'
        },
        ink: '#17253d',
        mist: '#eef3f8'
      },
      boxShadow: {
        soft: '0 16px 40px rgba(18, 38, 63, 0.12)',
        card: '0 10px 28px rgba(17, 43, 76, 0.08)'
      },
      borderRadius: {
        pill: '999px',
        hero: '28px'
      },
      fontFamily: {
        sans: ['"Inter"', 'system-ui', 'sans-serif']
      },
      backgroundImage: {
        'brand-pill': 'linear-gradient(90deg, #ef4444 0%, #b91c1c 100%)',
        'secondary-pill': 'linear-gradient(90deg, #3b82f6 0%, #1d4ed8 100%)'
      }
    }
  },
  plugins: []
};
