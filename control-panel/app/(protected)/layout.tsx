import { Navbar } from '@/components/layout/navbar';
import { redirect } from 'next/navigation';
import { ThemeSwitch } from "@/components/layout/theme-switch";
import { ThemeProvider } from "@/components/layout/theme-provider";

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

  return (
    <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
      <div className='flex w-full'>
        <Navbar />
        <ThemeSwitch />
        {children}
      </div>
    </ThemeProvider>
    );
}