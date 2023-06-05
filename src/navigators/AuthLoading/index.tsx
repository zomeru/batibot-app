import { createStackNavigator, StackScreenProps, TransitionPresets } from '@react-navigation/stack';

import { useAuth } from '@src/contexts/AuthProvider';
import AuthNavigator from '../AuthNavigator';
import { HomeNavigator } from '..';

export enum AUTH_LOADING_STACK {
  AUTH = 'Auth_Loading',
  HOME = 'Home_Loading',
}

export type AuthStackParamList = {
  [AUTH_LOADING_STACK.AUTH]: undefined;
  [AUTH_LOADING_STACK.HOME]: undefined;
};

export type AuthLoadingProps = StackScreenProps<AuthStackParamList, AUTH_LOADING_STACK>;

const Stack = createStackNavigator<AuthStackParamList>();

export default function AuthLoadingNavigator() {
  const { user } = useAuth();

  return (
    <Stack.Navigator
      initialRouteName={AUTH_LOADING_STACK.HOME}
      screenOptions={{
        headerShown: false,
        ...TransitionPresets.SlideFromRightIOS,
      }}>
      <>
        {user ? (
          <Stack.Screen name={AUTH_LOADING_STACK.HOME} component={HomeNavigator} />
        ) : (
          <Stack.Screen name={AUTH_LOADING_STACK.AUTH} component={AuthNavigator} />
        )}
      </>
    </Stack.Navigator>
  );
}
