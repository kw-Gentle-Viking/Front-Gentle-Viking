'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Sidebar from './Sidebar';
import MainContainer from './MainContainer';
import { FavoritesProvider } from '@/components/favorites/FavoritesContext';
import { PortfolioProvider } from '@/components/portfolio/PortfolioContext';
import { ensureDemoSession } from '@/lib/signup/auth';

const AUTH_ROUTES = ['/login', '/signup'];

export default function LayoutBody({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAuth = AUTH_ROUTES.some((r) => pathname.startsWith(r));

  useEffect(() => {
    if (!isAuth) ensureDemoSession();
  }, [isAuth]);

  if (isAuth) {
    return <main className="flex flex-1 flex-col">{children}</main>;
  }

  return (
    <FavoritesProvider>
      <PortfolioProvider>
        <Sidebar />
        <MainContainer>{children}</MainContainer>
      </PortfolioProvider>
    </FavoritesProvider>
  );
}
