/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import React from 'react';
import { StatusBar } from 'react-native';
import Toast, {
  ToastConfig,
  ToastConfigParams,
} from 'react-native-toast-message';

import RootContainer from '@src/containers';
import { CustomToast } from '@src/components';

const ToastConfigs: ToastConfig = {
  success: (props: ToastConfigParams<any>) => <CustomToast {...props} />,
  error: (props: ToastConfigParams<any>) => <CustomToast {...props} />,
  info: (props: ToastConfigParams<any>) => <CustomToast {...props} />,
  warning: (props: ToastConfigParams<any>) => <CustomToast {...props} />,
};

function App(): JSX.Element {
  return (
    <>
      <StatusBar barStyle='light-content' backgroundColor='#1a1e24' />
      <RootContainer />
      <Toast config={ToastConfigs} />
    </>
  );
}

export default App;
