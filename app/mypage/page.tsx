"use client";

import { useState } from "react";
import Assets from "@/components/mypage/Assets";
import OrderHistory from "@/components/mypage/OrderHistory";
import AITradeHistory from "@/components/mypage/AITradeHistory";
import ProfitAnalysis from "@/components/mypage/ProfitAnalysis";
import ProfileSettings from "@/components/mypage/ProfileSettings";

type MenuKey = "assets" | "orders" | "AItrades" | "analysis" | "profile";

const MENU_ITEMS: { key: MenuKey; label: string }[] = [
  { key: "assets", label: "자산" },
  { key: "orders", label: "주문내역" },
  { key: "AItrades", label: "AI자동거래내역" },
  { key: "analysis", label: "수익분석" },
  { key: "profile", label: "내 정보 변경" },
];

const MENU_CONTENT: Record<MenuKey, React.ReactNode> = {
  assets: <Assets />,
  orders: <OrderHistory />,
  AItrades: <AITradeHistory />,
  analysis: <ProfitAnalysis />,
  profile: <ProfileSettings />,
};

const MyPage = () => {
  const [activeMenu, setActiveMenu] = useState<MenuKey>("assets");

  return (
    <main className="min-h-screen text-slate-950">
      <div className="mx-auto flex max-w-6xl gap-0 px-5 py-8">
        {/* 좌측 사이드바 */}
        <aside className="w-44 shrink-0">
          <nav className="flex flex-col border-r border-gray-100">
            {MENU_ITEMS.map((item) => (
              <button
                key={item.key}
                onClick={() => setActiveMenu(item.key)}
                className={`relative py-3.5 pr-4 text-left text-sm transition-colors ${
                  activeMenu === item.key
                    ? "font-bold text-slate-900"
                    : "font-medium text-gray-400 hover:text-gray-600"
                }`}
              >
                {activeMenu === item.key && (
                  <span className="absolute right-0 top-0 h-full w-0.5 bg-black" />
                )}
                {item.label}
              </button>
            ))}
          </nav>
        </aside>

        {/* 우측 메인 콘텐츠 */}
        <section className="flex-1 pl-8">{MENU_CONTENT[activeMenu]}</section>
      </div>
    </main>
  );
};

export default MyPage;
