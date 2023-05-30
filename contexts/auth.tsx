import { useRouter, useSegments } from 'expo-router';
import React from 'react';

type User = {
  name: string;
};

interface UserContextProps {
  user: User;
  signIn: () => void;
  signOut: () => void;
}

const AuthContext = React.createContext<UserContextProps>(
  null as unknown as UserContextProps
);

// This hook can be used to access the user info.
export function useAuth() {
  return React.useContext(AuthContext);
}

// This hook will protect the route access based on user authentication.
function useProtectedRoute(user: User) {
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
      router.replace('/sign-in');
    } else if (user && inAuthGroup) {
      // Redirect away from the sign-in page.
      router.replace('/');
    }
  }, [user, segments]);
}

export default function Provider({ children }: { children: React.ReactNode }) {
  const [user, setAuth] = React.useState<User>(null as unknown as User);

  useProtectedRoute(user);

  const value = React.useMemo(
    () => ({
      user,
      signIn: () => setAuth({ name: 'Zoms' }),
      signOut: () => setAuth(null as unknown as User),
    }),
    [user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
