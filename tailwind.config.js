/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        dark: {
          bg: '#0b0f19',
          surface: '#111827',
          elevated: '#1f2937',
          border: '#374151',
          hover: '#1e293b',
        },
        primary: {
          DEFAULT: '#e11d48', // Oriental Red
          glow: '#f43f5e',
          light: '#fb7185',
          dark: '#9f1239',
        },
        secondary: {
          DEFAULT: '#fbbf24', // Imperial Gold
          glow: '#fcd34d',
          light: '#fde68a',
          dark: '#d97706',
        },
        accent: {
          gold: '#f59e0b',
          amber: '#fbbf24',
          emerald: '#22c55e',
          sky: '#38bdf8',
          cyan: '#22d3ee',
        },
        status: {
          success: '#22c55e',
          warning: '#eab308',
          info: '#3b82f6',
          error: '#ef4444',
          pending: '#f59e0b',
          reserved: '#3b82f6',
          paid: '#22c55e',
        },
        city: {
          shanghai: '#38bdf8',
          zhangjiajie: '#22c55e',
          chongqing: '#f97316',
          beijing: '#ef4444',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      backdropBlur: {
        xs: '2px',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'slide-up': 'slideUp 0.5s ease-out',
        'fade-in': 'fadeIn 0.5s ease-out',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'shimmer': 'shimmer 2s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(244, 63, 94, 0.5)' },
          '100%': { boxShadow: '0 0 20px rgba(244, 63, 94, 0.8), 0 0 40px rgba(244, 63, 94, 0.3)' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'shimmer': 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.05) 50%, transparent 100%)',
      },
    },
  },
  plugins: [],
}
