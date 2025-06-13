/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f5f8fa',
          100: '#e9eff5',
          200: '#c8d7e1',
          300: '#a6bed0',
          400: '#5b8ab2',
          500: '#2563eb',
          600: '#1e4fa3',
          700: '#193e7a',
          800: '#142e52',
          900: '#101e2b',
        },
        gray: {
          50: '#f9fafb',
          100: '#f3f4f6',
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
          900: '#111827',
        },
      },
    },
  },
  plugins: [],
}

// Use @layer components/utilities in your CSS for better splitting and purging. 