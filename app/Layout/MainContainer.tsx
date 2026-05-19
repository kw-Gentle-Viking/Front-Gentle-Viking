"use client";

import type { CSSProperties } from "react";
import React from "react";
import { usePathname } from "next/navigation";
import { useSidebar } from "@/components/sidebar/SidebarContext";

export default function MainContainer({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { isOpen } = useSidebar();
  const isStandalonePage = pathname === "/" || pathname === "/login" || pathname === "/signup";

  if (isStandalonePage) {
    return (
      <main key={pathname} className="min-h-screen bg-white page-swoop">
        {children}
      </main>
    );
  }

  const shellStyle = { "--sidebar-width": isOpen ? "340px" : "88px" } as CSSProperties;

  return (
    <main
      className="relative min-h-screen flex-1 overflow-hidden bg-[#f8fafc] text-slate-950 transition-[padding] duration-300 lg:pl-[var(--sidebar-width)]"
      style={shellStyle}
    >
      <div key={pathname} className="page-swoop relative mx-auto w-full max-w-[1480px] px-5 py-6 lg:px-8 lg:py-8">{children}</div>
    </main>
  );
}
