import type { Metadata } from 'next';
import './globals.css';
import { AppLayout } from '@/components/layout/app-layout';
import { Toaster } from "@/components/ui/toaster"
import { FirebaseProvider } from '@/firebase/provider';
import { ProtectedLayout } from '@/components/layout/protected-layout';
import { ThemeProvider } from '@/components/theme-provider';

export const metadata: Metadata = {
  title: 'Digital सखी',
  description: 'A centralized digital hub for rural communities.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=PT+Sans:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <FirebaseProvider>
              <ProtectedLayout>
                <AppLayout>{children}</AppLayout>
              </ProtectedLayout>
          </FirebaseProvider>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
