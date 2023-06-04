import React, { createContext, useMemo, useEffect } from 'react';
import { User } from '@supabase/supabase-js';
// import { useRoute } from '@react-navigation/native';
import { supabase } from '@src/utils/supabase';
import { findOrCreateUser } from '@src/helpers/supabase';
import { RootStackParamList, ROOT_STACK } from '@src/containers/Navigation';

import * as RootNavigation from '@src/containers/Navigation';

export type UserType = User | undefined;

type UserContextProps = {
  user: UserType;
  setUser: React.Dispatch<React.SetStateAction<UserType | undefined>>;
};

const AuthContext = createContext<UserContextProps>({} as UserContextProps);

export function useAuth() {
  return React.useContext(AuthContext);
}

//This hook will protect the route access based on user authentication.
function useProtectedRoute(user?: UserType, loading?: boolean) {
  const navigation = RootNavigation.navigationRef;

  React.useEffect(() => {
    const signedIn =
      user &&
      navigation.current?.getRootState().routes[0].name === ROOT_STACK.AUTH;

    const notSignedIn =
      !user &&
      navigation.current?.getRootState().routes[0].name !== ROOT_STACK.AUTH;

    if (loading && !!user === false) {
      navigation.navigate(ROOT_STACK.LOADING as keyof RootStackParamList);
    }

    if (notSignedIn) {
      // Redirect to the sign-in page.
      navigation.navigate(ROOT_STACK.AUTH as keyof RootStackParamList);
    } else if (signedIn) {
      // Redirect away from the sign-in page.
      navigation.navigate(ROOT_STACK.HOME as keyof RootStackParamList);
    }
  }, [user, navigation, loading]);
}

export default function Provider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = React.useState<UserType | undefined>();
  const [loading, setLoading] = React.useState(true);

  useProtectedRoute(user, loading);

  useEffect(() => {
    async function getSession() {
      const { data } = await supabase.auth.getSession();
      const currentUser = data?.session?.user;
      console.log('currentUser ID', currentUser?.id);
      setUser(currentUser as UserType);
      if (currentUser) {
        await findOrCreateUser(currentUser.email!, currentUser.id);
      }
      setLoading(false);
    }

    if (!user) {
      getSession().catch(console.error);
    }

    const { data: authData } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('event', event);
        setLoading(true);
        const user = session?.user ?? undefined;
        setUser(user as UserType);
        if (user) {
          await findOrCreateUser(user.email!, user.id);
        }
        setLoading(false);
      }
    );

    return () => {
      authData?.subscription?.unsubscribe();
    };
  }, []);

  useEffect(() => {}, []);

  const value = useMemo(() => ({ user, setUser }), [user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
