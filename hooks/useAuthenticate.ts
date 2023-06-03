import { useRouter } from 'expo-router';
import React from 'react';
import Toast from 'react-native-toast-message';
import { findOrCreateUser } from '~services/supabase';

import { validateEmail } from '~utils/other';
import { supabase, handleSupabaseResendOTP } from '~utils/supabase';

interface SignInParams {
  email: string;
  password: string;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

interface SignUpParams {
  email: string;
  password: string;
  confirmPassword: string;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

interface VerifyEmailParams {
  email: string;
  code: string;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export const useAuthenticate = () => {
  const router = useRouter();

  const handleSignIn = async ({ email, password, setLoading }: SignInParams) => {
    if (!email || !password) {
      Toast.show({
        type: 'warning',
        text1: 'Email and password are required.',
      });
      return;
    }
    setLoading(true);
    let { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      const errMsg = error.message.toLowerCase();

      if (errMsg === 'email not confirmed') {
        // If email is not confirmed, resend OTP
        await handleSupabaseResendOTP(email, setLoading);

        router.push({
          pathname: '/verify',
          params: {
            email: email.toLowerCase().trim(),
            message: `Please verify your email address to continue using Batibot.`,
          },
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
      email,
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
        router.push({
          pathname: '/verify',
          params: {
            email: data.user?.email,
          },
        });
      }
    }
    setLoading(false);
  };

  const handleVerifyEmail = async ({ code, setLoading, email }: VerifyEmailParams) => {
    if (!code) {
      Toast.show({
        type: 'warning',
        text1: 'Please enter the code we sent you.',
      });
      return;
    }

    setLoading(true);

    const { data, error } = await supabase.auth.verifyOtp({
      token: code.trim(),
      type: 'signup',
      email,
    });

    if (error) {
      Toast.show({
        type: 'error',
        text1: error.message,
      });
    }

    if (data) {
      Toast.show({
        type: 'success',
        text1: 'Email verified!',
      });
    }

    setLoading(false);
  };

  return {
    handleSignIn,
    handleSignUp,
    handleVerifyEmail,
  };
};
