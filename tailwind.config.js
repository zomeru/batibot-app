/** @type {import('tailwindcss').Config} */
module.exports = {
<<<<<<< HEAD
  content: ['src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primaryBackground: '#1a1e24',
        secondaryBackground: '#292b37',
        tertiaryBackground: '#5e626d',
        primaryAccent: '#3eb7d1',
        secondaryAccent: '#78d3af',
        promptText: '#d6d6d6',
        primaryText: '#fffcfc',
        secondaryText: '#5e6980',
        tertiaryText: '#a0a7b8',
        success: '#78d3af',
        error: '#ff4d4d',
        warning: '#ffaf40',
        info: '#3eb7d1',
      },
      fontFamily: {
        roboto: ['Roboto'],
      },
=======
  content: ['./app/**/*.{js,jsx,ts,tsx}', './components/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {},
    colors: {
      primaryBackground: '#1a1e24',
      secondaryBackground: '#292b37',
      tertiaryBackground: '#5e626d',
      primaryAccent: '#3eb7d1',
      secondaryAccent: '#78d3af',
      promptText: '#d6d6d6',
      primaryText: '#fffcfc',
      secondaryText: '#5e6980',
      tertiaryText: '#a0a7b8',
      success: '#78d3af',
      error: '#ff4d4d',
      warning: '#ffaf40',
      info: '#3eb7d1',
>>>>>>> 3418e80c061b9252b4b455576a88167d3dee3818
    },
  },
  plugins: [],
};
