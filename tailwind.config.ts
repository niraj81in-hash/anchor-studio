import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Anchor Studio brand palette
        ink:    '#0E1A12',
        slate:  '#1E2A3A',
        teal:   { DEFAULT: '#0D7F6A', light: '#E0F2EE', mid: '#5DCAA5', dark: '#085041' },
        gold:   { DEFAULT: '#C9A84C', light: '#FBF3E0' },
        warm:   '#F7F4EF',
        mid:    '#5C6B63',
        rule:   '#D4D9D6',
      },
      fontFamily: {
        serif: ['Playfair Display', 'Georgia', 'serif'],
        sans:  ['DM Sans', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;
