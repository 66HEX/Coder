import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#EEEEEE', // Ciemne tło
        card: '#FFFFFF',
        textPrimary: '#232323',
        textSecondary: '#A4A4A4',
      },
      boxShadow: {
        cardShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
      },
      borderRadius: {
        'cardRadius': '0.5rem',
      },
      fontFamily: {
        EikoItalic: 'EikoItalic',
        NeueMontrealVariable: 'NeueMontrealVariable'
      },
      fontSize: {
        '2xl': ['1.5rem', '2.125rem'],
        fluid: '12.5vw',  // hero, preloader, works
        fluid2: '9vw',    // contact
        fluid3: '12.5vw',
      },
    },
  },
  plugins: [],
};

export default config;
