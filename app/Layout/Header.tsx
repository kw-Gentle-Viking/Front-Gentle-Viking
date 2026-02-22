'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Header() {
  const [isLoggedIn] = useState(() => {
    if (typeof window === 'undefined') return false;
    return localStorage.getItem('gv-auth') === 'true';
  });

  const handleLogout = () => {
    localStorage.removeItem('gv-auth');
    location.href = '/';
  };

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/80 backdrop-blur">
      <div className="mx-auto flex h-[64px] max-w-[1100px] items-center justify-between px-[24px] md:px-[32px]">
        <Link href="/" className="flex items-center gap-[10px]">
          <span className="text-[26px] font-semibold tracking-tight text-slate-900">
            Gentle Viking
          </span>
          <span className="hidden rounded-full bg-sky-50 px-[10px] py-[4px] text-[12px] text-blue-800 ring-1 ring-sky-200 md:inline">
            AI Trading
          </span>
        </Link>

        <nav className="flex items-center gap-[14px] text-[14px] text-slate-600">
          {!isLoggedIn ? (
            <>
              <Link href="/login" className="hover:text-slate-900">
                로그인
              </Link>
              <Link
                href="/signup"
                className="rounded-[10px] bg-blue-800 px-[12px] py-[8px] text-white shadow-sm hover:bg-blue-800"
              >
                회원가입
              </Link>
            </>
          ) : (
            <>
              <Link href="/news" className="hover:text-slate-900">
                AI 뉴스분석
              </Link>
              <Link href="/mypage" className="hover:text-slate-900">
                마이페이지
              </Link>
              <button
                type="button"
                onClick={handleLogout}
                className="rounded-[10px] border border-slate-200 px-[12px] py-[8px] text-blue-800 hover:bg-blue-800 hover:text-white"
              >
                로그아웃
              </button>
            </>
          )}
        </nav>
      </div>

      <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-blue-800/20 to-transparent" />
    </header>
  );
}
