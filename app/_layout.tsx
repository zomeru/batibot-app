import 'react-native-url-polyfill/auto';
import { useEffect } from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useFonts } from 'expo-font';
import Toast from 'react-native-toast-message';
import { SplashScreen, Stack } from 'expo-router';
import { Buffer } from 'buffer';

import { AuthProvider } from '~contexts/index';
import CustomToast from '~components/CustomToast';

global.Buffer = Buffer;

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(home)',
};

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  return (
    <>
      {!loaded && <SplashScreen />}
      {loaded && <RootLayoutNav />}
    </>
  );
}

function RootLayoutNav() {
  return (
    <AuthProvider>
      <Stack
        initialRouteName='(home)'
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name='(home)' />
        <Stack.Screen name='(auth)' />
      </Stack>
      <Toast
        config={{
          success: props => <CustomToast {...props} />,
          error: props => <CustomToast {...props} />,
          info: props => <CustomToast {...props} />,
          warning: props => <CustomToast {...props} />,
        }}
      />
    </AuthProvider>
  );
}
