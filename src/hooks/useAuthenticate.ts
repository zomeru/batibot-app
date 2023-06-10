import { NavigationProp, useNavigation } from '@react-navigation/native';
import React from 'react';
import Toast from 'react-native-toast-message';
import { findOrCreateUser } from '@src/helpers/supabase';

import { validateEmail } from '@src/utils/other';
import { supabase, resendOTP } from '@src/utils/supabase';
import { AUTH_STACK, AuthStackParamList } from '@src/navigators/AuthNavigator';
import { OmitType } from '@src/utils/ts';

interface AuthParams {
  email: string;
  password: string;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

interface SignUpParams extends AuthParams {
  confirmPassword: string;
}

interface VerifyEmailParams extends OmitType<AuthParams, 'password'> {
  code: string;
  type: 'signup' | 'recovery';
}

interface ForgotPasswordParams extends OmitType<AuthParams, 'password'> {}

export const useAuthenticate = () => {
  const navigation = useNavigation<NavigationProp<AuthStackParamList>>();

  const handleSignIn = async ({ email, password, setLoading }: AuthParams) => {
    if (!email || !password) {
      Toast.show({
        type: 'warning',
        text1: 'Email and password are required.',
      });
      return;
    }
    setLoading(true);
    let { error } = await supabase.auth.signInWithPassword({
      email: email.toLowerCase().trim(),
      password,
    });

    if (error) {
      const errMsg = error.message.toLowerCase();

      if (errMsg === 'email not confirmed') {
        // If email is not confirmed, resend OTP
        await resendOTP(email, setLoading);

        navigation.navigate(AUTH_STACK.VERIFY, {
          email: email.toLowerCase().trim(),
          message: `Please verify your email address to continue using Batibot.`,
          type: 'signup',
          title: 'Verify Email',
        });

        return;
      }

      Toast.show({
        type: 'error',
        text1: error.message,
      });
    }

    setLoading(false);
  };

  const handleSignUp = async ({ email, password, confirmPassword, setLoading }: SignUpParams) => {
    const lowerCaseEmail = email.toLowerCase().trim();

    if (!lowerCaseEmail || !password || !confirmPassword) {
      Toast.show({
        type: 'warning',
        text1: 'All fields are required.',
      });
      return;
    }

    if (!validateEmail(lowerCaseEmail)) {
      Toast.show({
        type: 'warning',
        text1: 'Invalid email.',
      });
      return;
    }

    if (password !== confirmPassword) {
      Toast.show({
        type: 'warning',
        text1: 'Passwords do not match.',
      });
      return;
    }
    setLoading(true);

    let { data, error } = await supabase.auth.signUp({
      email: lowerCaseEmail,
      password,
    });

    if (error) {
      Toast.show({
        type: 'error',
        text1: error.message,
      });
      setLoading(false);
      return;
    }

    if (data) {
      const [user] = await findOrCreateUser(lowerCaseEmail, data?.user?.id!);

      if (user) {
        Toast.show({
          type: 'error',
          text1: 'Email already exists.',
        });
      } else {
        navigation.navigate(AUTH_STACK.VERIFY, {
          email: data.user?.email!,
          type: 'signup',
          title: 'Verify Email',
        });
      }
    }
    setLoading(false);
  };

  const handleVerifyOTP = async ({ code, setLoading, email, type }: VerifyEmailParams) => {
    if (!code) {
      Toast.show({
        type: 'warning',
        text1: 'Please enter the code we sent to your email.',
      });
      return;
    }

    setLoading(true);

    const { data, error } = await supabase.auth.verifyOtp({
      token: code.trim(),
      type,
      email,
    });

    if (error) {
      Toast.show({
        type: 'error',
        text1: error.message,
      });
    }

    if (data) {
      if (type === 'signup') {
        Toast.show({
          type: 'success',
          text1: 'Email verified!',
        });
      } else {
        navigation.setParams({
          type: 'recovery',
        });
      }
    }

    setLoading(false);
  };

  const handleForgotPassword = async ({ email, setLoading }: ForgotPasswordParams) => {
    if (!email) {
      Toast.show({
        type: 'warning',
        text1: 'Please enter your email address.',
      });
      return;
    }

    const isEmailValid = validateEmail(email);
    if (!isEmailValid) {
      Toast.show({
        type: 'warning',
        text1: 'Please enter a valid email address.',
      });
      return;
    }

    setLoading(true);

    const { error } = await supabase.auth.resetPasswordForEmail(email.toLowerCase().trim());

    if (error) {
      Toast.show({
        type: 'error',
        text1: error.message,
      });
    } else {
      Toast.show({
        type: 'success',
        text1: 'OTP sent!',
      });
      navigation.navigate(AUTH_STACK.VERIFY, {
        email,
        type: 'recovery',
        title: 'Log in using OTP',
        message: `Please enter the code we sent to your email to log in your account.`,
      });
    }

    setLoading(false);
  };

  return {
    handleSignIn,
    handleSignUp,
    handleVerifyOTP,
    handleForgotPassword,
  };
};
