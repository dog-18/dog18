import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        violet: '#9f84bd',
        wisteria: '#c09bd8',
        pink: '#e0a3c8',
        lavender: '#ede3e9',
        eggshell: '#e6e4ce',
      },
    },
  },
  plugins: [],
}
export default config
