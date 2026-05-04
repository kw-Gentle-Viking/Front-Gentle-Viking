'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const AUTH_ROUTES = ['/login', '/signup'];

export default function Footer() {
  const pathname = usePathname();
  const isAuth = AUTH_ROUTES.some((r) => pathname.startsWith(r));

  return (
    <footer
      className={`border-t text-slate-700 ${
        isAuth
          ? 'bg-[#CADcF2] border-transparent'
          : 'border-slate-200/70 bg-white/80 backdrop-blur'
      }`}
    >
      <div className="mx-auto flex h-[52px] max-w-[1100px] items-center justify-between px-[24px] text-[12px] md:px-[32px]">
        <div className="flex items-center gap-[8px]">
          <span className="font-medium text-slate-900">
            Gentle Viking
          </span>
          <span className="hidden sm:inline text-slate-300">•</span>
          <span className="hidden sm:inline text-slate-600">
            © {new Date().getFullYear()}
          </span>
        </div>

        <div className="flex items-center gap-[10px]">
          <Link
            href="/terms"
            className="text-slate-600 hover:text-blue-600"
          >
            이용약관
          </Link>
          <span className="text-slate-300">|</span>
          <Link
            href="/privacy"
            className="text-slate-600 hover:text-blue-600"
          >
            개인정보처리방침
          </Link>
        </div>
      </div>
    </footer>
  );
}
