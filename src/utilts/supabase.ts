import 'react-native-url-polyfill/auto';
import EncryptedStorage from 'react-native-encrypted-storage';
import {createClient} from '@supabase/supabase-js';
import * as AuthSession from 'expo-auth-session';
import Toast from 'react-native-toast-message';
import Constants from 'expo-constants';
import Linking from 'expo-linking';

const SUPABASE_URL = Constants.expoConfig?.extra?.SUPABASE_URL;
const SUPABASE_SERVICE_KEY = Constants.expoConfig?.extra?.SUPABASE_SERVICE_KEY;

const SecureStoreAdapter = {
  getItem: (key: string) => {
    return EncryptedStorage.getItem(key);
  },
  setItem: (key: string, value: string) => {
    EncryptedStorage.setItem(key, value);
  },
  removeItem: (key: string) => {
    EncryptedStorage.removeItem(key);
  },
};

export const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY, {
  auth: {
    storage: SecureStoreAdapter as any,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

type OAuthProvider = 'google' | 'github' | 'discord';

export const oAuthLogin = async (provider: OAuthProvider) => {
  const redirectUrl = AuthSession.makeRedirectUri({
    useProxy: false,
    path: '/expo-auth-session',
  });

  const linkingUrl = Linking.createURL('/expo-auth-session');

  console.log({
    redirectUrl,
    linkingUrl,
  });

  const authUrl = `${SUPABASE_URL}/auth/v1/authorize?provider=${provider}&redirect_to=${redirectUrl}&prompt=consent`;

  AuthSession.startAsync({
    authUrl,
    returnUrl: redirectUrl,
  })
    .then(response => {
      console.log('response', response);

      if (response.type === 'success') {
        supabase.auth.setSession({
          access_token: response.params.access_token,
          refresh_token: response.params.refresh_token,
        });
      }
    })
    .catch(error => {
      console.log('error signin in', {
        error,
        message: error.message,
      });
    });

  // if (authSessionResponse.type !== 'success') return;

  // supabase.auth.setSession({
  //   access_token: authSessionResponse.params.access_token,
  //   refresh_token: authSessionResponse.params.refresh_token,
  // });
};

export const handleSupabaseResendOTP = async (
  email: string,
  setLoading?: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  if (setLoading) setLoading(true);
  const {data, error} = await supabase.auth.resend({
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
