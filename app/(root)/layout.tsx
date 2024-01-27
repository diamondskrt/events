import { ReactNode } from 'react';
import { Header } from '@/components/shared/header';
import { Footer } from '@/components/shared/footer';

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <div className="flex h-screen flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
