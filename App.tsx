/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import React, { useEffect } from 'react';
import { StatusBar } from 'react-native';
import Toast, { ToastConfig, ToastConfigParams } from 'react-native-toast-message';

import RootContainer from '@src/containers';
import { CustomToast } from '@src/components';
import { WithSplashScreen } from '@src/components/WithSplashScreen';

const ToastConfigs: ToastConfig = {
  success: (props: ToastConfigParams<any>) => <CustomToast {...props} />,
  error: (props: ToastConfigParams<any>) => <CustomToast {...props} />,
  info: (props: ToastConfigParams<any>) => <CustomToast {...props} />,
  warning: (props: ToastConfigParams<any>) => <CustomToast {...props} />,
};

function App(): JSX.Element {
  const [isAppReady, setIsAppReady] = React.useState(false);

  useEffect(() => {
    setIsAppReady(true);
  }, []);

  return (
    <WithSplashScreen isAppReady={isAppReady}>
      <StatusBar barStyle="light-content" backgroundColor="#1a1e24" />
      <RootContainer />
      <Toast config={ToastConfigs} />
    </WithSplashScreen>
  );
}

export default App;
