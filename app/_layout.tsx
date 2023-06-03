import 'react-native-url-polyfill/auto';
import { useEffect } from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useFonts } from 'expo-font';
import Toast, { ToastConfig, ToastConfigParams } from 'react-native-toast-message';
import { SplashScreen, Stack } from 'expo-router';
import { Buffer } from 'buffer';
import * as WebBrowser from 'expo-web-browser';

import { AuthProvider } from '~contexts/index';
import CustomToast from '~components/CustomToast';
import 'react-native-gesture-handler';

global.Buffer = Buffer;
WebBrowser.maybeCompleteAuthSession();

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: 'index',
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

const ToastConfigs: ToastConfig = {
  success: (props: ToastConfigParams<any>) => <CustomToast {...props} />,
  error: (props: ToastConfigParams<any>) => <CustomToast {...props} />,
  info: (props: ToastConfigParams<any>) => <CustomToast {...props} />,
  warning: (props: ToastConfigParams<any>) => <CustomToast {...props} />,
};

function RootLayoutNav() {
  return (
    <AuthProvider>
      <Stack
        initialRouteName="index"
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="(home)" />
        <Stack.Screen name="(auth)" />
      </Stack>
      <Toast config={ToastConfigs} />
    </AuthProvider>
  );
}
