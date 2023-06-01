/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,jsx,ts,tsx}', './components/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {},
    colors: {
      primaryBackground: '#1a1e24',
      secondaryBackground: '#292b37',
      primaryAccent: '#3eb7d1',
      secondaryAccent: '#78d3af',
      primaryText: '#fffcfc',
      secondaryText: '#5e6980',
      success: '#78d3af',
      error: '#ff4d4d',
      warning: '#ffaf40',
      info: '#3eb7d1',
    },
  },
  plugins: [],
};
