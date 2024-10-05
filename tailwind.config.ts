import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        'neon-green': '0 0 2px #0f0, 0 0 4px #0f0, 0 0 6px #0f0, 3px 2px 2px rgba(0, 255, 0, 0.125)',
        'neon-yellow': '0 0 2px #ff0, 0 0 4px #ff0, 0 0 6px #ff0, 3px 2px 2px rgba(255, 255, 0, 0.125)',
        'neon-blue': '0 0 2px #00f, 0 0 4px #00f, 0 0 6px #00f, 3px 2px 2px rgba(0, 0, 255, 0.125)',
        'neon-red': '0 0 2px #f00, 0 0 4px #f00, 0 0 6px #f00, 3px 2px 2px rgba(255, 0, 0, 0.125)',
      },
      keyframes: {
        pulseGreen: {
          '0%, 100%': {
            boxShadow: '0 0 2px #0f0, 0 0 4px #0f0, 0 0 6px #0f0, 3px 2px 2px rgba(0, 255, 0, 0.125)',
          },
          '50%': {
            boxShadow: '0 0 4px #0f0, 0 0 8px #0f0, 0 0 12px #0f0, 3px 2px 2px rgba(0, 255, 0, 0.175)',
          },
        },
        pulseYellow: {
          '0%, 100%': {
            boxShadow: '0 0 2px #ff0, 0 0 4px #ff0, 0 0 6px #ff0, 3px 2px 2px rgba(255, 255, 0, 0.125)',
          },
          '50%': {
            boxShadow: '0 0 4px #ff0, 0 0 8px #ff0, 0 0 12px #ff0, 3px 2px 2px rgba(255, 255, 0, 0.175)',
          },
        },
        pulseBlue: {
          '0%, 100%': {
            boxShadow: '0 0 2px #00f, 0 0 4px #00f, 0 0 6px #00f, 3px 2px 2px rgba(0, 0, 255, 0.125)',
          },
          '50%': {
            boxShadow: '0 0 4px #00f, 0 0 8px #00f, 0 0 12px #00f, 3px 2px 2px rgba(0, 0, 255, 0.175)',
          },
        },
        pulseRed: {
          '0%, 100%': {
            boxShadow: '0 0 2px #f00, 0 0 4px #f00, 0 0 6px #f00, 3px 2px 2px rgba(255, 0, 0, 0.125)',
          },
          '50%': {
            boxShadow: '0 0 4px #f00, 0 0 8px #f00, 0 0 12px #f00, 3px 2px 2px rgba(255, 0, 0, 0.175)',
          },
        },
      },
      animation: {
        pulseGreen: 'pulseGreen 2s infinite',
        pulseYellow: 'pulseYellow 2s infinite',
        pulseBlue: 'pulseBlue 2s infinite',
        pulseRed: 'pulseRed 2s infinite',
      },}
  },
  plugins: [ require('tailwindcss-animated')],
};
export default config;
