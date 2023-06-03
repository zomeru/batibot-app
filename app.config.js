module.exports = {
  expo: {
    name: 'Batibot',
    slug: 'batibot',
    version: '1.0.0',
    orientation: 'portrait',
    icon: './assets/images/icon.png',
    scheme: 'com.zomeru.batibot',
    userInterfaceStyle: 'automatic',
    splash: {
      image: './assets/images/splash.png',
      resizeMode: 'contain',
      backgroundColor: '#1a1e24',
    },
    assetBundlePatterns: ['**/*'],
    ios: {
      supportsTablet: true,
      bundleIdentifier: 'com.zomeru.batibot',
    },
    android: {
      adaptiveIcon: {
        foregroundImage: './assets/images/adaptive-icon.png',
        backgroundColor: '#1a1e24',
      },
      package: 'com.zomeru.batibot',
    },
    web: {
      bundler: 'metro',
      favicon: './assets/images/favicon.png',
    },
    extra: {
      SUPABASE_SERVICE_KEY: process.env.SUPABASE_SERVICE_KEY,
      SUPABASE_URL: process.env.SUPABASE_URL,
      OPENAI_API_KEY: process.env.OPENAI_API_KEY,
      eas: {
        projectId: 'a7c1ba7a-4c42-4c99-b0eb-26be41a890df',
      },
    },
  },
};
