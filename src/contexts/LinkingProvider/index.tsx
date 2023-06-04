import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useEffect } from 'react';
import { Linking } from 'react-native';

import { supabase } from '@src/utils/supabase';
import { useAuth, type UserType } from '../AuthProvider';

const LinkingProvider = ({ children }: { children: React.ReactNode }) => {
  const navigation = useNavigation<StackNavigationProp<any>>();
  const { setUser } = useAuth();

  useEffect(() => {
    Linking.addEventListener('url', (event) => {
      let urlString = event.url;
      if (event.url.includes('auth#')) {
        urlString = event.url.replace('auth#', 'auth?');
      }
      const url = new URL(urlString);

      const refreshToken = url.searchParams.get('refresh_token');
      const accessToken = url.searchParams.get('access_token');

      if (accessToken && refreshToken) {
        supabase.auth
          .setSession({
            refresh_token: refreshToken,
            access_token: accessToken,
          })
          .then((res) => {
            const user = res.data.user;
            setUser(user as UserType);
          })
          .catch((err) => console.log({ err }));
      }
    });
    return () => {
      Linking.removeAllListeners('url');
    };
  }, [navigation]);

  return <>{children}</>;
};

export default LinkingProvider;
