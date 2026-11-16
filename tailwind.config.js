/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      screens: {
        short: { raw: '(max-height: 820px)' },
        tall: { raw: '(min-height: 920px)' },
      },
      colors: {
        primary: {
          DEFAULT: '#667eea',
          dark: '#764ba2',
        },
        dark: {
          DEFAULT: '#0f172a',
          lighter: '#1e293b',
        },
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      },
      animation: {
        'float': 'float 20s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '50%': { transform: 'translate(-50px, -50px)' },
        },
      },
    },
  },
  plugins: [],
}


