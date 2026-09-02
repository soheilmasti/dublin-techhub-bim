/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Vazirmatn', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      colors: {
        clay: {
          50: '#F9FAFB',
          100: '#F3F4F6',
          200: '#E5E7EB',
          300: '#D1D5DB',
          400: '#9CA3AF',
          500: '#6B7280',
          800: '#1F2937',
          900: '#111827',
          950: '#090D14',
        },
        arch: {
          light: '#F8F9FA',
          pure: '#FFFFFF',
          dark: '#0D0E12',
          muted: '#8E94A0',
          accent: '#2563EB',
          gold: '#C5A880'
        }
      },
      boxShadow: {
        'clay-sm': '0 4px 20px -2px rgba(0, 0, 0, 0.05)',
        'clay-md': '0 10px 30px -4px rgba(0, 0, 0, 0.08), 0 4px 12px -2px rgba(0, 0, 0, 0.03)',
        'clay-lg': '0 20px 45px -8px rgba(0, 0, 0, 0.12), 0 8px 16px -4px rgba(0, 0, 0, 0.04)',
        'glow': '0 0 25px rgba(37, 99, 235, 0.25)',
      }
    },
  },
  plugins: [],
}
