/* Tailwind Play-CDN config for the no-build runtime. Keep in sync with tailwind.config.js. */
window.tailwind = window.tailwind || {};
tailwind.config = {
  theme: {
    extend: {
      colors: {
        ink: { 950: '#050A1C', 900: '#0A1230', 800: '#101B45', 700: '#18275E', 600: '#22347A', 500: '#3B4E9A', 400: '#6B7BBE', 300: '#A7B1DA', 200: '#D5DAEE', 100: '#ECEFF8' },
        volt: { 50: '#FFF9E5', 100: '#FFF0B8', 200: '#FFE485', 300: '#FFD84F', 400: '#FFCB24', 500: '#F5B50A', 600: '#D29600', 700: '#A87500' },
        mist: '#F4F6FB'
      },
      fontFamily: { sans: ['Vazirmatn', 'system-ui', 'sans-serif'] },
      boxShadow: {
        soft: '0 10px 40px -12px rgba(10,18,48,.18)',
        card: '0 1px 2px rgba(10,18,48,.04), 0 18px 40px -22px rgba(10,18,48,.28)',
        lift: '0 2px 4px rgba(10,18,48,.05), 0 30px 60px -24px rgba(10,18,48,.35)',
        glow: '0 12px 36px -10px rgba(245,181,10,.65)'
      }
    }
  }
};
