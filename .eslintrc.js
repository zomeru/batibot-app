module.exports = {
  root: true,
  extends: ['@react-native-community', 'eslint-config-prettier'],
  rules: {
    // JS
    'no-useless-escape': 'off',

    // React
    'react/react-in-jsx-scope': 'off',

    // React Native
    'react-native/no-inline-styles': 'off',
  },
};
