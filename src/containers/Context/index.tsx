import {AuthProvider, LinkingProvider} from '@src/contexts';

export default function ContextContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <LinkingProvider>{children}</LinkingProvider>
    </AuthProvider>
  );
}
