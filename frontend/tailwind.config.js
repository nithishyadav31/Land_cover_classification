/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        space: {
          950: '#0b0d17', // Deepest space
          900: '#15192b', // Deep navy
          800: '#1e293b', // Charcoal
          700: '#334155', // Slate
        },
        earth: {
          blue: '#3b82f6', // Ocean
          green: '#10b981', // Vegetation
          land: '#d97706', // Arid/Land
          cloud: '#f8fafc', // Atmosphere
        },
        text: {
          main: '#f1f5f9', // Soft white
          muted: '#94a3b8', // Gray-blue
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      backgroundImage: {
        'earth-pattern': "url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop')", // Fallback/Overlay
      }
    },
  },
  plugins: [],
}
