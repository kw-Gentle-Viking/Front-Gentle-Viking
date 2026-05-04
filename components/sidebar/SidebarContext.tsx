"use client";

import React, { createContext, useContext, useState } from "react";

type SidebarTab = "portfolio" | "favorite" | "history" | "close";

interface SidebarContextType {
  isOpen: boolean;
  activeTab: SidebarTab;
  openSidebar: (tab: SidebarTab) => void;
  closeSidebar: () => void;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export const SidebarProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isOpen, setIsOpen] = useState(true);
  const [activeTab, setActiveTab] = useState<SidebarTab>("portfolio");

  const openSidebar = (tab: SidebarTab) => {
    if (tab === "close") {
      closeSidebar();
      return;
    }
    setActiveTab(tab);
    setIsOpen(true);
  };

  const closeSidebar = () => {
    setIsOpen(false);
  };

  return (
    <SidebarContext.Provider
      value={{ isOpen, activeTab, openSidebar, closeSidebar }}
    >
      {children}
    </SidebarContext.Provider>
  );
};

export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
};
