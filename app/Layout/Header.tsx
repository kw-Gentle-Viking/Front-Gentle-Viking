"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IoSearchOutline } from "react-icons/io5";
import { useSidebar } from "@/components/sidebar/SidebarContext";

export default function Header() {
  const pathname = usePathname();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("gv-auth");
    setIsLoggedIn(false);
    location.href = "/";
  };

  const { isOpen } = useSidebar();
  const sidebarWidth = isOpen ? "370px" : "56px";

  const publicMenus = [
    { name: "홈", href: "/" },
    { name: "AI 리포트", href: "/ai-report" },
  ];

  const loggedInMenus = [
    ...publicMenus,
    { name: "내 주식보기", href: "/portfolio" },
    { name: "마이페이지", href: "/mypage" },
  ];

  return (
    <header
      className="sticky top-0 z-50 bg-white px-6 h-[58px] flex items-center
    justify-between transition-all duration-300 ease-in-out border-b border-gray-100"
      style={{ width: `calc(100% - ${sidebarWidth})` }}
    >
      {/* 1. 로고 및 네비게이션 */}
      <div className="flex items-center gap-8">
        <Link href="/" className="flex items-center gap-2">
          <img
            src="/genvi.png"
            alt="Gentle Viking Logo"
            className="h-16 w-auto object-contain"
          />
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          {publicMenus.map((menu) => {
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
          })}

          {isLoggedIn ? (
            <>
              {loggedInMenus.slice(2).map((menu) => {
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
              })}
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

      {/* 2. 우측 검색 버튼 */}
      <div className="flex items-center gap-4">
        <div className="relative group">
          <input
            type="text"
            placeholder="종목 검색하기"
            className="w-64 bg-gray-50 border border-transparent rounded-full py-2 px-4 pl-10 text-sm focus:bg-white focus:border-gray-200 focus:ring-0 transition-all outline-none"
          />
          <IoSearchOutline className="absolute left-3 top-2.5 text-gray-400 group-focus-within:text-black w-5 h-5" />
        </div>

        {/* 개발 테스트용 버튼 (로그인/로그아웃 전환) */}
        <button
          onClick={() => setIsLoggedIn(!isLoggedIn)}
          className="text-[10px] bg-slate-100 px-2 py-1 rounded text-slate-400 hover:bg-slate-200"
        >
          {isLoggedIn ? "로그아웃 됨" : "로그인 됨"}
        </button>
      </div>
    </header>
  );
}
