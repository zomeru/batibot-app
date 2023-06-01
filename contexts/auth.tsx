import React, { createContext, useMemo, useEffect } from 'react';
import { User } from '@supabase/supabase-js';
import { useSegments } from 'expo-router/src/LocationProvider';
import { useRouter } from 'expo-router';

import { supabase } from '~utils/supabase';
import { findOrCreateUser } from '~services/supabase';

type UserContextProps = {
  user?: User;
};

const AuthContext = createContext<UserContextProps>(
  null as unknown as UserContextProps
);

export function useAuth() {
  return React.useContext(AuthContext);
}

// This hook will protect the route access based on user authentication.
function useProtectedRoute(user?: User) {
  const segments = useSegments();
  const router = useRouter();

  React.useEffect(() => {
    const inAuthGroup = segments[0] === '(auth)';

    if (
      // If the user is not signed in and the initial segment is not anything in the auth group.
      !user &&
      !inAuthGroup
    ) {
      // Redirect to the sign-in page.
      router.replace('/(auth)/sign-in');
    } else if (user && inAuthGroup) {
      // Redirect away from the sign-in page.
      router.replace('/home');
    }
  }, [user, segments]);
}

export default function Provider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = React.useState<User | undefined>();

  useProtectedRoute(user);

  useEffect(() => {
    async function getSession() {
      const { data } = await supabase.auth.getSession();
      const currentUser = data?.session?.user;
      console.log('currentUser ID', currentUser?.id);
      setUser(currentUser);
      if (currentUser) {
        await findOrCreateUser(currentUser.email!, currentUser.id);
      }
    }

    getSession().catch(console.error);

    const { data: authData } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log(event, session?.user?.email);
        console.log('identities', session?.user?.user_metadata);
        const user = session?.user ?? undefined;
        setUser(user);
        console.log('New user ID', user?.id);
        if (user) {
          await findOrCreateUser(user.email!, user.id);
        }
      }
    );

    return () => {
      authData?.subscription?.unsubscribe();
    };
  }, []);

  const value = useMemo(() => ({ user }), [user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
