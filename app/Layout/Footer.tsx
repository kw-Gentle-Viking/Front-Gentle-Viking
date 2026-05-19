"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();
  const isStandalonePage = pathname === "/" || pathname === "/login" || pathname === "/signup";

  if (!isStandalonePage) return null;

  return (
    <footer className="border-t border-slate-200/70 bg-white/80 text-slate-700 backdrop-blur">
      <div className="mx-auto flex h-[52px] max-w-[1100px] items-center justify-between px-6 text-xs">
        <span className="font-medium text-slate-900">Gentle Viking</span>
        <div className="flex items-center gap-3">
          <Link href="/terms" className="text-slate-600 hover:text-blue-600">이용약관</Link>
          <Link href="/privacy" className="text-slate-600 hover:text-blue-600">개인정보처리방침</Link>
        </div>
      </div>
    </footer>
  );
}
