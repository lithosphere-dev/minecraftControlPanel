import { redirect } from 'next/navigation';

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Check authentication status
  const isAuthenticated = true;

  if (!isAuthenticated) {
    // Redirect if not authenticated
    redirect('/');
  }

  return <>{children}</>;
}