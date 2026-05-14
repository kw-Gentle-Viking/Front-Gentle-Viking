"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { IoSearchOutline } from "react-icons/io5";
import { useSidebar } from "@/components/sidebar/SidebarContext";
import {
  AUTH_EVENT_NAME,
  AuthUser,
  getCurrentUser,
  logoutUser,
} from "@/lib/auth";

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    const syncAuth = () => setCurrentUser(getCurrentUser());

    syncAuth();
    window.addEventListener(AUTH_EVENT_NAME, syncAuth);
    window.addEventListener("storage", syncAuth);

    return () => {
      window.removeEventListener(AUTH_EVENT_NAME, syncAuth);
      window.removeEventListener("storage", syncAuth);
    };
  }, []);

  const handleLogout = async () => {
    await logoutUser();
    setCurrentUser(null);
    router.push("/");
  };

  const { isOpen } = useSidebar();
  const sidebarWidth = isOpen ? "370px" : "56px";

  const isStandalonePage =
    pathname === "/" || pathname === "/login" || pathname === "/signup";

  if (isStandalonePage) {
    return null;
  }

  const publicMenus = [
    { name: "홈", href: currentUser ? "/dashboard" : "/" },
    { name: "AI 리포트", href: "/ai-report" },
  ];

  const memberMenus = [
    { name: "내 주식보기", href: "/portfolio" },
    { name: "마이페이지", href: "/mypage" },
  ];

  const renderMenuLink = (menu: { name: string; href: string }) => {
    const isActive = pathname === menu.href;

    return (
      <Link
        key={menu.href}
        href={menu.href}
        className={`text-sm transition-colors ${
          isActive
            ? "text-[#333D4B] font-bold"
            : "text-[#6B7684] font-medium hover:text-[#333D4B]"
        }`}
      >
        {menu.name}
      </Link>
    );
  };

  return (
    <header
      className="sticky top-0 z-50 bg-white px-6 h-[58px] flex items-center
    justify-between transition-all duration-300 ease-in-out border-b border-gray-100"
      style={{ width: `calc(100% - ${sidebarWidth})` }}
    >
      <div className="flex items-center gap-8">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/genvi.png"
            alt="Gentle Viking Logo"
            width={128}
            height={64}
            priority
            className="h-16 w-auto object-contain"
          />
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          {publicMenus.map(renderMenuLink)}

          {currentUser ? (
            <>
              {memberMenus.map(renderMenuLink)}
              <span className="text-sm font-semibold text-slate-500">
                {currentUser.nickname}님
              </span>
              <button
                type="button"
                onClick={handleLogout}
                className="text-sm font-semibold text-[#6B7684] transition-colors hover:text-[#333D4B]"
              >
                로그아웃
              </button>
            </>
          ) : (
            <div className="flex items-center gap-0">
              <Link
                href="/login"
                className={`text-sm transition-colors ${
                  pathname === "/login"
                    ? "text-[#333D4B] font-bold"
                    : "text-[#6B7684] font-medium hover:text-[#333D4B]"
                }`}
              >
                로그인
              </Link>
              <span className="text-[#D1D6DB] mx-2 select-none">|</span>
              <Link
                href="/signup"
                className={`text-sm transition-colors ${
                  pathname === "/signup"
                    ? "text-[#333D4B] font-bold"
                    : "text-[#6B7684] font-medium hover:text-[#333D4B]"
                }`}
              >
                회원가입
              </Link>
            </div>
          )}
        </nav>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative group">
          <input
            type="text"
            placeholder="종목 검색하기"
            className="w-64 bg-gray-50 border border-transparent rounded-full py-2 px-4 pl-10 text-sm focus:bg-white focus:border-gray-200 focus:ring-0 transition-all outline-none"
          />
          <IoSearchOutline className="absolute left-3 top-2.5 text-gray-400 group-focus-within:text-black w-5 h-5" />
        </div>
      </div>
    </header>
  );
}
