import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    // Strictly disable rounded corners across all utilities
    borderRadius: {
      none: '0px',
      sm: '0px',
      DEFAULT: '0px',
      md: '0px',
      lg: '0px',
      xl: '0px',
      '2xl': '0px',
      '3xl': '0px',
      full: '0px',
    },
    extend: {
      colors: {
        cream: {
          50: '#FFFEF5',
          100: '#FFFDD0', // Classic light cream
          200: '#FAF7E1',
          DEFAULT: '#F5F5DC', // Main base cream
          300: '#EFECCE',
          400: '#E4DFB5',
          card: '#FAF9EE',
          dark: '#E2DDB2',
        },
        teal: {
          DEFAULT: '#008080', // Primary teal
          light: '#00A3A3',
          dark: '#005959',   // Deep action teal
          deep: '#003D3D',
          hover: '#006E6E',
          soft: '#E0F2F1',
        },
        pink: {
          DEFAULT: '#FF69B4', // Hot pink accent
          light: '#FFC0CB',   // Soft pink
          soft: '#FFE4E8',
          hover: '#FF1493',   // Deep active pink
          glow: 'rgba(255, 105, 180, 0.25)',
        },
        charcoal: {
          900: '#111818',
          800: '#1D2A2A',
          700: '#2C3E3E',
          600: '#405454',
          500: '#5F7575',
          300: '#94A6A6',
          100: '#D5DFDF',
        }
      },
      boxShadow: {
        'brutal-teal': '4px 4px 0px #005959',
        'brutal-teal-sm': '2px 2px 0px #005959',
        'brutal-teal-lg': '6px 6px 0px #003D3D',
        'brutal-pink': '4px 4px 0px #FF69B4',
        'brutal-pink-sm': '2px 2px 0px #FF69B4',
        'brutal-dark': '4px 4px 0px #111818',
        'brutal-hover': '1px 1px 0px #005959',
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'Courier New', 'monospace'],
        sans: ['Space Grotesk', 'Inter', 'system-ui', 'sans-serif'],
      },
      borderWidth: {
        '3': '3px',
      }
    },
  },
  plugins: [],
};
export default config;
