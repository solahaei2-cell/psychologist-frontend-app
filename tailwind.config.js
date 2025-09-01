module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,jsx}'
  ],
  darkMode: 'class', // فعال کردن dark mode
  theme: {
    extend: {
      fontFamily: {
        vazir: ['Vazir', 'sans-serif']
      },
      colors: {
        purple: {
          500: '#8B5CF6', // بنفش روشن برای اعتماد
          600: '#7C3AED',
          700: '#6D28D9'
        },
        blue: {
          500: '#3B82F6', // آبی برای آرامش
          600: '#2563EB',
          50: '#EFF6FF' // آبی روشن برای زمینه آرام
        },
        gray: {
          50: '#F9FAFB', // زمینه روشن برای کاهش استرس
          600: '#4B5563'
        }
      }
    }
  },
  plugins: [],
}