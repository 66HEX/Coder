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
        hexblack: '#1C1C1C',
        hexgray: '#A4A4A4',
        hexwhite: '#F3F3F3',
      },
      fontFamily: {
        EikoItalic: 'EikoItalic',
        NeueMontrealVariable: 'NeueMontrealVariable'
      },
      fontSize: {
        fluid: '12.5vw',  // hero, preloader, works
        fluid2: '9vw',    // contact
        fluid3: '12.5vw',
      },
    },
  },
  plugins: [],
};

export default config;
