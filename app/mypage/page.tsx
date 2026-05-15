"use client";

import { useState } from "react";
import Assets from "@/components/mypage/Assets";

type MenuKey = "assets" | "transactions" | "orders" | "analysis" | "profile";

const MENU_ITEMS: { key: MenuKey; label: string }[] = [
  { key: "assets", label: "자산" },
  { key: "transactions", label: "거래내역" },
  { key: "orders", label: "주문내역" },
  { key: "analysis", label: "수익분석" },
  { key: "profile", label: "내 정보 변경" },
];

const MENU_CONTENT: Record<MenuKey, React.ReactNode> = {
  assets: <Assets />,
  transactions: <div>거래내역 콘텐츠</div>,
  orders: <div>주문내역 콘텐츠</div>,
  analysis: <div>수익분석 콘텐츠</div>,
  profile: <div>내 정보 변경 콘텐츠</div>,
};

const MyPage = () => {
  const [activeMenu, setActiveMenu] = useState<MenuKey>("assets");

  return (
    <main className="min-h-screen text-slate-950">
      <div className="mx-auto flex max-w-6xl gap-0 px-5 py-8">
        {/* 좌측 사이드바 */}
        <aside className="w-40 shrink-0">
          <nav className="flex flex-col">
            {MENU_ITEMS.map((item) => (
              <button
                key={item.key}
                onClick={() => setActiveMenu(item.key)}
                className={`py-3 text-left text-sm font-medium transition-colors ${
                  activeMenu === item.key
                    ? "font-semibold text-slate-950"
                    : "text-slate-400 hover:text-slate-700"
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>
        </aside>

        {/* 구분선 */}
        <div className="mx-4 w-px bg-slate-200" />

        {/* 우측 메인 콘텐츠 */}
        <section className="flex-1">{MENU_CONTENT[activeMenu]}</section>
      </div>
    </main>
  );
};

export default MyPage;
