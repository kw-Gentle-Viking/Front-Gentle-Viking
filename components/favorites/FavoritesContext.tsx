"use client";

import { createContext, useContext, useState } from "react";

type FavoritesContextValue = {
  favorites: Set<string>;
  toggleFavorite: (stockCode: string) => void;
  isFavorited: (stockCode: string) => boolean;
};

const FavoritesContext = createContext<FavoritesContextValue | null>(null);

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [favorites, setFavorites] = useState<Set<string>>(
    () => new Set(["005930", "000660"]),
  );

  function toggleFavorite(stockCode: string) {
    setFavorites((prev) => {
      const next = new Set(prev);
      if (next.has(stockCode)) next.delete(stockCode);
      else next.add(stockCode);
      return next;
    });
  }

  function isFavorited(stockCode: string) {
    return favorites.has(stockCode);
  }

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorited }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const ctx = useContext(FavoritesContext);
  if (!ctx) throw new Error("useFavorites must be used within FavoritesProvider");
  return ctx;
}
