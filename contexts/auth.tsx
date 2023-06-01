import React, { createContext, useMemo, useEffect } from 'react';
import { Session } from '@supabase/supabase-js';
import { useSegments } from 'expo-router/src/LocationProvider';
import { useRouter } from 'expo-router';

import { supabase } from '../utils/supabase';

type ContextProps = {
  session: Session | null;
};

const AuthContext = createContext<Partial<ContextProps>>({});

export function useAuth() {
  return React.useContext(AuthContext);
}

// This hook will protect the route access based on user authentication.
function useProtectedRoute(session: Session | null, userLoading: boolean) {
  const segments = useSegments();
  const router = useRouter();

  React.useEffect(() => {
    const inAuthGroup = segments[0] === '(auth)';

    console.log({
      segment: segments[0],
    });

    if (
      // If the user is not signed in and the initial segment is not anything in the auth group.
      !session &&
      !inAuthGroup
    ) {
      // Redirect to the sign-in page.
      router.replace('/(auth)/sign-in');
    } else if (session && inAuthGroup) {
      // Redirect away from the sign-in page.
      router.replace('/home');
    }
  }, [session, segments]);
}

export default function Provider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = React.useState<Session | null>(null);
  const [loading, setLoading] = React.useState(true);

  useProtectedRoute(session, loading);

  useEffect(() => {
    async function getSession() {
      const { data } = await supabase.auth.getSession();
      const newSession = data?.session;
      setSession(newSession);
    }

    getSession().catch(console.error);

    const { data: authData } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log(event, session);
        setSession(session);
      }
    );

    return () => {
      authData?.subscription?.unsubscribe();
    };
  }, []);

  const value = useMemo(() => ({ session }), [session]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
