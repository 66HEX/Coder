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
        hexblack: '#252525',
        hexgray: '#A4A4A4',
        hexwhite: '#EEEEEE',
      },
      fontFamily: {
        EikoItalic: 'EikoItalic',
        NeueMontrealVariable: 'NeueMontrealVariable'
      },
      fontSize: {
        '2xl': ['1.5rem', '2.25rem' ],
        fluid: '12.5vw',  // hero, preloader, works
        fluid2: '9vw',    // contact
        fluid3: '12.5vw',
      },
    },
  },
  plugins: [],
};

export default config;
