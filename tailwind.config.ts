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
        background: '#F0F2FB',
        card: '#FFFFFF',
        textPrimary: '#323232',
        textSecondary: '#A4A4A4',
        accent: '#323232'
      },
      boxShadow: {
        cardShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
      },
      borderRadius: {
        'cardRadius': '1rem',
      },
      fontFamily: {
        AeonikProRegular: 'AeonikProRegular',
        AeonikProRegularItalic: 'AeonikProRegularItalic',
        AeonikProSemibold: 'AeonikProSemibold'
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
