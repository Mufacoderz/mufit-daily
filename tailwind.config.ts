/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['var(--font-bebas)', 'cursive'],
        body: ['var(--font-barlow)', 'sans-serif'],
        jakarta: ['var(--font-jakarta)', 'sans-serif'],
      },
      colors: {
        fire: {
          500: '#EF4444',
          600: '#DC2626',
          700: '#B91C1C',
        },
        ember: {
          400: '#FB923C',
          500: '#F97316',
          600: '#EA580C',
          700: '#C2410C',
        },
        stone: {
          50:  '#FAFAF9',
          100: '#F5F5F4',
          200: '#E7E5E4',
          300: '#D6D3D1',
          400: '#A8A29E',
          500: '#78716C',
          600: '#57534E',
          700: '#44403C',
          800: '#292524',
          900: '#1C1917',
          950: '#0C0A09',
        },
        primary: '#FFD60A',
      },
      backgroundImage: {
        'fire-grad': 'linear-gradient(135deg, #DC2626 0%, #EA580C 55%, #F59E0B 100%)',
        'fire-grad-r': 'linear-gradient(to right, #DC2626, #EA580C, #F59E0B)',
      },
      boxShadow: {
        'fire': '0 4px 20px rgba(220, 38, 38, 0.35)',
        'fire-lg': '0 8px 32px rgba(220, 38, 38, 0.45)',
        'glow': '0 0 20px rgba(234, 88, 12, 0.4)',
        'yellow': '0 4px 20px rgba(255, 214, 10, 0.3)',
      },
      keyframes: {
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
      },
      animation: {
        shimmer: 'shimmer 2s infinite',
      },
    },
  },
  plugins: [],
}