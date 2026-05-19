"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Assets from "@/components/mypage/Assets";
import OrderHistory from "@/components/mypage/OrderHistory";
import AITradeHistory from "@/components/mypage/AITradeHistory";
import ProfitAnalysis from "@/components/mypage/ProfitAnalysis";
import ProfileSettings from "@/components/mypage/ProfileSettings";

type MenuKey = "assets" | "orders" | "AItrades" | "analysis" | "profile";

const MENU_ITEMS: { key: MenuKey; label: string; description: string }[] = [
  { key: "assets", label: "자산", description: "보유 자산과 월별 수익을 한눈에 확인합니다." },
  { key: "orders", label: "주문내역", description: "직접 주문과 AI 자동매매 주문 요청을 함께 확인합니다." },
  { key: "AItrades", label: "AI 자동거래 내역", description: "AI 자동매매 체결 건만 표시됩니다." },
  { key: "analysis", label: "수익분석", description: "최근 수익 흐름과 손익 구성을 확인합니다." },
  { key: "profile", label: "내 정보 변경", description: "프로필과 투자 성향, 알림 설정을 관리합니다." },
];

const MENU_CONTENT: Record<MenuKey, React.ReactNode> = {
  assets: <Assets />,
  orders: <OrderHistory />,
  AItrades: <AITradeHistory />,
  analysis: <ProfitAnalysis />,
  profile: <ProfileSettings />,
};

function getMenuKey(tab: string | null): MenuKey {
  const found = MENU_ITEMS.find((item) => item.key === tab);
  return found?.key ?? "assets";
}

function MyPageContent() {
  const searchParams = useSearchParams();
  const activeMenu = getMenuKey(searchParams.get("tab"));
  const activeItem = MENU_ITEMS.find((item) => item.key === activeMenu);
  const activeLabel = activeItem?.label;
  const activeDescription = activeItem?.description;

  return (
    <section className="rounded-2xl bg-white p-6 pt-5 shadow-[0_24px_80px_rgba(15,23,42,0.06)] lg:p-8 lg:pt-6">
      <div className="mb-5 flex flex-wrap items-end justify-between gap-4 border-b border-slate-100 pb-4">
        <div>
          <p className="text-sm font-bold text-[#5267ff]">My Page</p>
          <h1 className="mt-2 text-4xl font-black text-slate-950">{activeLabel}</h1>
          <p className="mt-2 text-sm font-medium text-slate-400">{activeDescription}</p>
        </div>
        <span className="rounded-full bg-[#f4f7ff] px-4 py-2 text-sm font-black text-[#5267ff]">
          {activeLabel}
        </span>
      </div>

      <div className="rounded-xl bg-slate-50/70 p-3 sm:p-4">
        <div className="rounded-xl border border-slate-100 bg-white p-5 shadow-[0_12px_32px_rgba(15,23,42,0.04)] sm:p-6">
          {MENU_CONTENT[activeMenu]}
        </div>
      </div>
    </section>
  );
}

export default function MyPage() {
  return (
    <Suspense fallback={null}>
      <MyPageContent />
    </Suspense>
  );
}
