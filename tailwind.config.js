
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // 自定义颜色、字体、阴影等
      colors: {
        primary: '#007bff',
        secondary: '#6c757d',
        gold: '#ffcc00',
        silver: '#c0c0c0',
        bronze: '#cd7f32',
        background: '#f9fafb',
        card: '#ffffff',
        textPrimary: '#333333',
      },
      fontFamily: {
        sans: ['Roboto', 'Arial', 'sans-serif'],
      },
      boxShadow: {
        card: '0 4px 6px rgba(0, 0, 0, 0.1)',
      },
      borderRadius: {
        card: '8px',
      },
    },
  },
  plugins: [
  ],
};