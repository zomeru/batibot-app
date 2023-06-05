import * as React from 'react';
import { createNavigationContainerRef } from '@react-navigation/native';
import { createStackNavigator, StackScreenProps, TransitionPresets } from '@react-navigation/stack';

import { AuthLoadingNavigator } from '@src/navigators';
import InitialLoadingScreen from '@src/screens/Loading';

export enum ROOT_STACK {
  AUTH_LOADING = 'Auth_Loading_Stack',
  LOADING = 'Loading_Stack',
}

export type RootStackParamList = {
  [ROOT_STACK.AUTH_LOADING]: undefined;
  [ROOT_STACK.LOADING]: undefined;
};

export type RootProps = StackScreenProps<RootStackParamList, ROOT_STACK>;

const Stack = createStackNavigator<RootStackParamList>();

export const navigationRef = createNavigationContainerRef<RootStackParamList>();

export function navigate(name: ROOT_STACK, params?: any) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name, params);
  }
}

export const TransitionScreenOptions = {
  ...TransitionPresets.SlideFromRightIOS,
};

export default function RootNavigation() {
  return (
    <Stack.Navigator screenOptions={TransitionScreenOptions} initialRouteName={ROOT_STACK.LOADING}>
      <Stack.Screen
        name={ROOT_STACK.LOADING}
        component={InitialLoadingScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={ROOT_STACK.AUTH_LOADING}
        component={AuthLoadingNavigator}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
