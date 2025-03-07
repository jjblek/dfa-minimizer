/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  important: true,
  darkMode: 'data-theme',
  theme: {
    extend: {
      backgroundColor: {
				dark: "#212529",
				light: "#EEF2F6",
			},
      textColor: {
				dark: "#212529",
				light: "#ffffff",
			},
      textColor: ['dark'],
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}
