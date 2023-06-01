module.exports = {
  expo: {
    name: 'batibot-app',
    slug: 'batibot-app',
    version: '1.0.0',
    orientation: 'portrait',
    icon: './assets/images/icon.png',
    scheme: 'com.zomeru.batibot-app',
    userInterfaceStyle: 'automatic',
    splash: {
      image: './assets/images/splash.png',
      resizeMode: 'contain',
      backgroundColor: '#ffffff',
    },
    assetBundlePatterns: ['**/*'],
    ios: {
      supportsTablet: true,
      bundleIdentifier: 'com.zomeru.batibot-app',
    },
    android: {
      adaptiveIcon: {
        foregroundImage: './assets/images/adaptive-icon.png',
        backgroundColor: '#ffffff',
      },
      package: 'com.zomeru.batibot_app',
    },
    web: {
      bundler: 'metro',
      favicon: './assets/images/favicon.png',
    },
    extra: {
      clerkPublishableKey: process.env.CLERK_PUBLISHABLE_KEY,
      supabaseServiceKey: process.env.SUPABASE_SERVICE_KEY,
      supabaseUrl: process.env.SUPABASE_URL,
      OPENAI_API_KEY: process.env.OPENAI_API_KEY,
    },
  },
};
