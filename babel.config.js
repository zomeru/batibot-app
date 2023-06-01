module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          alias: {
            components: './components',
            utils: './utils',
            assets: './assets',
            contexts: './contexts',
            hooks: './hooks',
            constants: './constants',
          },
        },
      ],
      '@babel/plugin-proposal-export-namespace-from',
      'nativewind/babel',
      'react-native-reanimated/plugin',
      require.resolve('expo-router/babel'),
    ],
  };
};
