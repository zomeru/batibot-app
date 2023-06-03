import React, { createContext, useMemo, useEffect } from 'react';
import { User } from '@supabase/supabase-js';
import { useSegments } from 'expo-router/src/LocationProvider';
import { useRouter } from 'expo-router';

import { supabase } from '~utils/supabase';
import { findOrCreateUser } from '~services/supabase';

type UserType = User;

type UserContextProps = {
  user?: UserType;
};

const AuthContext = createContext<UserContextProps>(null as unknown as UserContextProps);

export function useAuth() {
  return React.useContext(AuthContext);
}

// This hook will protect the route access based on user authentication.
function useProtectedRoute(user?: UserType, loading?: boolean) {
  const segments = useSegments();
  const router = useRouter();

  React.useEffect(() => {
    const signedIn = user && (segments[0] === '(auth)' || segments.length === 0);

    const notSignedIn = !user && !(segments[0] === '(auth)' || segments[0] !== undefined);

    if (loading && !user) {
      router.replace('/');
      return;
    }

    if (notSignedIn) {
      // Redirect to the sign-in page.
      router.replace('/(auth)/sign-in');
    } else if (signedIn) {
      // Redirect away from the sign-in page.
      router.replace('/home');
    }
  }, [user, segments, loading]);
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

    const { data: authData } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('event', event);
      setLoading(true);
      const user = session?.user ?? undefined;
      setUser(user as UserType);
      if (user) {
        await findOrCreateUser(user.email!, user.id);
      }
      setLoading(false);
    });

    return () => {
      authData?.subscription?.unsubscribe();
    };
  }, []);

  const value = useMemo(() => ({ user }), [user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
