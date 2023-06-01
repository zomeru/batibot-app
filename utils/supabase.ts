import 'react-native-url-polyfill/auto';
import * as SecureStore from 'expo-secure-store';
import { createClient } from '@supabase/supabase-js';
import * as AuthSession from 'expo-auth-session';
import Constants from 'expo-constants';
import Toast from 'react-native-toast-message';

const ExpoSecureStoreAdapter = {
  getItem: (key: string) => {
    return SecureStore.getItemAsync(key);
  },
  setItem: (key: string, value: string) => {
    SecureStore.setItemAsync(key, value);
  },
  removeItem: (key: string) => {
    SecureStore.deleteItemAsync(key);
  },
};

const supabaseUrl = Constants.expoConfig?.extra?.supabaseUrl;
const supabaseServiceKey = Constants.expoConfig?.extra?.supabaseServiceKey;

export const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    storage: ExpoSecureStoreAdapter as any,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

type OAuthProvider = 'google' | 'github' | 'discord';

export const oAuthLogin = async (provider: OAuthProvider) => {
  const redirectUrl = AuthSession.makeRedirectUri({
    path: '/auth/callback',
  });

  const authUrl = `${supabaseUrl}/auth/v1/authorize?provider=${provider}&redirect_to=${redirectUrl}`;

  const authSessionResponse = await AuthSession.startAsync({
    authUrl,
    returnUrl: redirectUrl,
  });

  if (authSessionResponse.type !== 'success') return;

  supabase.auth.setSession({
    access_token: authSessionResponse.params.access_token,
    refresh_token: authSessionResponse.params.refresh_token,
  });
};

export const handleSupabaseResendOTP = async (
  email: string,
  setLoading?: React.Dispatch<React.SetStateAction<boolean>>
) => {
  if (setLoading) setLoading(true);
  const { data, error } = await supabase.auth.resend({
    email: email!,
    type: 'signup',
  });

  if (data) {
    Toast.show({
      type: 'success',
      text1: 'OTP sent!',
    });
  }

  if (error) {
    Toast.show({
      type: 'error',
      text1: error.message,
    });
  }

  if (setLoading) setLoading(false);
};
