"use client";

import React from "react";
import { useSidebar } from "@/components/sidebar/SidebarContext";

export default function MainContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isOpen } = useSidebar();

  const sidebarWidth = isOpen ? "370px" : "56px";

  return (
    <main
      className="flex-1 bg-white transition-all duration-300 ease-in-out"
      style={{ paddingRight: sidebarWidth }}
    >
      <div className="mx-auto max-w-[1280px] px-6">{children}</div>
    </main>
  );
}
