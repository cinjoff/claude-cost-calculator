import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-jakarta)', 'sans-serif'],
      },
      colors: {
        bg: '#FAF7F2',
        accent: '#E07A5F',
        'text-primary': '#1A1A2E',
        'table-top': '#C8D9C0',
        'table-left': '#B0C4A8',
        'table-right': '#9DB89A',
      },
    },
  },
  plugins: [],
};

export default config;
