import { createStackNavigator, StackScreenProps, TransitionPresets } from '@react-navigation/stack';

import { ForgotPasswordScreen, SignInScreen, SignUpScreen, VerifyScreen } from '@src/screens';

export enum AUTH_STACK {
  SIGN_IN = 'Sign In',
  SIGN_UP = 'Sign Up',
  VERIFY = 'Verify',
  FORGOT_PASSWORD = 'Forgot Password',
}

type AuthParams =
  | {
      email: string;
      message?: string;
      type?: 'signup' | 'recovery';
      title?: string;
    }
  | undefined;

export type AuthStackParamList = {
  [AUTH_STACK.SIGN_IN]: undefined;
  [AUTH_STACK.SIGN_UP]: undefined;
  [AUTH_STACK.VERIFY]: Exclude<AuthParams, undefined>;
  [AUTH_STACK.FORGOT_PASSWORD]: undefined;
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
      }}>
      <Stack.Screen name={AUTH_STACK.SIGN_IN} component={SignInScreen} />
      <Stack.Screen name={AUTH_STACK.SIGN_UP} component={SignUpScreen} />
      <Stack.Screen name={AUTH_STACK.VERIFY} component={VerifyScreen} />
      <Stack.Screen name={AUTH_STACK.FORGOT_PASSWORD} component={ForgotPasswordScreen} />
    </Stack.Navigator>
  );
}
