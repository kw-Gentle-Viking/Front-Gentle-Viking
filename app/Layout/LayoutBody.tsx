'use client';

import { usePathname } from 'next/navigation';
import Sidebar from './Sidebar';
import MainContainer from './MainContainer';

const AUTH_ROUTES = ['/login', '/signup'];

export default function LayoutBody({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAuth = AUTH_ROUTES.some((r) => pathname.startsWith(r));

  if (isAuth) {
    return <main className="flex flex-1 flex-col">{children}</main>;
  }

  return (
    <>
      <Sidebar />
      <MainContainer>{children}</MainContainer>
    </>
  );
}
