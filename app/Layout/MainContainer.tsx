"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { useSidebar } from "@/components/sidebar/SidebarContext";

export default function MainContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { isOpen } = useSidebar();

  const sidebarWidth = isOpen ? "370px" : "56px";

  const isStandalonePage =
    pathname === "/" || pathname === "/login" || pathname === "/signup";

  if (isStandalonePage) {
    return <main className="min-h-screen bg-white">{children}</main>;
  }

  return (
    <main
      className="flex-1 bg-gray-50/40 transition-all duration-300 ease-in-out"
      style={{ paddingRight: sidebarWidth }}
    >
      <div className="mx-auto max-w-[1280px] px-6">{children}</div>
    </main>
  );
}
