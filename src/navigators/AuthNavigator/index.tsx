import {
  createStackNavigator,
  StackScreenProps,
  TransitionPresets,
} from '@react-navigation/stack';

import { SignInScreen, SignUpScreen, VerifyScreen } from '@src/screens';

export enum AUTH_STACK {
  SIGN_IN = 'Sign In',
  SIGN_UP = 'Sign Up',
  VERIFY = 'Verify',
}

export type AuthStackParamList = {
  [AUTH_STACK.SIGN_IN]: undefined;
  [AUTH_STACK.SIGN_UP]: undefined;
  [AUTH_STACK.VERIFY]: {
    email: string;
    message?: string;
  };
};

export type AuthProps = StackScreenProps<AuthStackParamList, AUTH_STACK>;

const Stack = createStackNavigator<AuthStackParamList>();

export default function AuthNavigator() {
  return (
    <Stack.Navigator
      initialRouteName={AUTH_STACK.SIGN_IN}
      screenOptions={{
        headerShown: false,
        ...TransitionPresets.SlideFromRightIOS,
      }}
    >
      <Stack.Screen name={AUTH_STACK.SIGN_IN} component={SignInScreen} />
      <Stack.Screen name={AUTH_STACK.SIGN_UP} component={SignUpScreen} />
      <Stack.Screen name={AUTH_STACK.VERIFY} component={VerifyScreen} />
    </Stack.Navigator>
  );
}
