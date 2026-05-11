/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        paper:  { DEFAULT: '#efe8d8', 2: '#e6dcc4', 3: '#d9cdb0' },
        stone:  { DEFAULT: '#1f1d1a', 2: '#2d2a25' },
        ember:  { DEFAULT: '#3e7d52', 2: '#52a36a', 3: '#2c5c3a' },
        moss:   '#5d5b3e',
      },
      fontFamily: {
        serif: ['"Instrument Serif"', 'Georgia', 'serif'],
        sans:  ['"DM Sans"', 'system-ui', 'sans-serif'],
        mono:  ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
    },
  },
  plugins: [],
}
