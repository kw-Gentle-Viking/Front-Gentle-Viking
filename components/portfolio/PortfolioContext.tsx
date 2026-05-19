"use client";

import { createContext, useContext, useState } from "react";
import { mockStockPnl } from "@/lib/mypage/mock";

type PortfolioContextValue = {
  portfolio: Set<string>;
  togglePortfolio: (stockCode: string) => void;
  inPortfolio: (stockCode: string) => boolean;
};

const PortfolioContext = createContext<PortfolioContextValue | null>(null);

export function PortfolioProvider({ children }: { children: React.ReactNode }) {
  const [portfolio, setPortfolio] = useState<Set<string>>(
    () => new Set(mockStockPnl.map((s) => s.stockCode)),
  );

  function togglePortfolio(stockCode: string) {
    setPortfolio((prev) => {
      const next = new Set(prev);
      if (next.has(stockCode)) next.delete(stockCode);
      else next.add(stockCode);
      return next;
    });
  }

  function inPortfolio(stockCode: string) {
    return portfolio.has(stockCode);
  }

  return (
    <PortfolioContext.Provider value={{ portfolio, togglePortfolio, inPortfolio }}>
      {children}
    </PortfolioContext.Provider>
  );
}

export function usePortfolio() {
  const ctx = useContext(PortfolioContext);
  if (!ctx) throw new Error("usePortfolio must be used within PortfolioProvider");
  return ctx;
}
