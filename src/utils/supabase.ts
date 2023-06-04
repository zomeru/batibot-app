import EncryptedStorage from 'react-native-encrypted-storage';
import {createClient} from '@supabase/supabase-js';
import Toast from 'react-native-toast-message';
import {SUPABASE_URL, SUPABASE_SERVICE_KEY} from '@env';
import {Linking} from 'react-native';

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
  const authUrl = `${SUPABASE_URL}/auth/v1/authorize?provider=${provider}&redirect_to=batibot://auth&prompt=consent`;

  Linking.openURL(authUrl);
};

export const resendOTP = async (
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
