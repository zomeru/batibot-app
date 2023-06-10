import React, { createContext, useMemo, useEffect } from 'react';
import { User } from '@supabase/supabase-js';
import { StackActions } from '@react-navigation/native';

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
function useInitialLoading(loading: boolean) {
  const navigation = RootNavigation.navigationRef;

  React.useEffect(() => {
    if (loading) {
      navigation.dispatch(StackActions.replace(ROOT_STACK.LOADING as keyof RootStackParamList));
    } else {
      navigation.dispatch(
        StackActions.replace(ROOT_STACK.AUTH_LOADING as keyof RootStackParamList)
      );
    }
  }, [navigation, loading]);
}

export default function Provider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = React.useState<UserType | undefined>();
  const [loading, setLoading] = React.useState(true);

  useInitialLoading(loading);

  useEffect(() => {
    async function getSession() {
      const { data } = await supabase.auth.getSession();
      const currentUser = data?.session?.user;
      setUser(currentUser as UserType);
      if (currentUser) {
        await findOrCreateUser(currentUser.email!, currentUser.id);
      }
      setLoading(false);
    }

    if (!user) {
      getSession().catch(console.error);
    }

    const { data: authData } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('event', event);
      const newUser = session?.user ?? undefined;
      setUser(newUser as UserType);
      if (newUser) {
        await findOrCreateUser(newUser.email!, newUser.id);
      }
      setLoading(false);
    });

    return () => {
      authData?.subscription?.unsubscribe();
    };
  }, [user]);

  const value = useMemo(() => ({ user, setUser }), [user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
