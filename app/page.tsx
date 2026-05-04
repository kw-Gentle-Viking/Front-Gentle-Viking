"use client";

import React, { useState, useEffect } from "react";

// ─── Mock Data ────────────────────────────────────────────────
const aiRecommendation = {
  time: "09:00",
  name: "KB 금융",
  score: 68,
  price: "139,500원",
  change: "-1.08%",
  isUp: false,
};

const recentTrade = {
  name: "삼성전자",
  price: "180,800원",
  type: "매도" as "매수" | "매도",
};

const marketIndices = [
  {
    id: 1,
    name: "코스피",
    value: "5,455.62",
    change: "-4.84",
    percent: "0.08%",
    isUp: false,
  },
  {
    id: 2,
    name: "코스닥",
    value: "1,145.59",
    change: "+8.95",
    percent: "0.78%",
    isUp: true,
  },
];

const popularStocks = [
  { id: 1, rank: 1, name: "삼성전자", price: "81,200원", change: "+0.61%", isUp: true, volume: "431억원" },
  { id: 2, rank: 2, name: "SK하이닉스", price: "163,000원", change: "-1.25%", isUp: false, volume: "198억원" },
  { id: 3, rank: 3, name: "엔에이치스팩33호", price: "4,390원", change: "+119.50%", isUp: true, volume: "138억원" },
  { id: 4, rank: 4, name: "한화솔루션", price: "35,250원", change: "-4.21%", isUp: false, volume: "70억원" },
  { id: 5, rank: 5, name: "카카오", price: "55,400원", change: "+1.45%", isUp: true, volume: "67억원" },
];

const myStocks = [
  { id: 1, rank: "-", name: "애플", price: "235,400원", change: "+1.20%", isUp: true, volume: "120억원" },
  { id: 2, rank: "-", name: "테슬라", price: "240,100원", change: "-3.15%", isUp: false, volume: "95억원" },
];
// ─────────────────────────────────────────────────────────────

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<"popular" | "mine">("popular");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(localStorage.getItem("gv-auth") === "true");
  }, []);

  const currentList = activeTab === "popular" ? popularStocks : myStocks;

  return (
    <div className="flex flex-col gap-8 pt-4 pb-10">

      {/* [1] 상단 카드 */}
      <section className="flex gap-3 overflow-x-auto pb-1 scrollbar-hide">

        {/* 로그인 후에만 표시 */}
        {isLoggedIn && (
          <>
            {/* AI 추천 종목 */}
            <div className="min-w-[200px] shrink-0 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-xs font-medium text-gray-500">AI 추천 종목</span>
                <span className="text-xs text-gray-400">{aiRecommendation.time}</span>
              </div>
              <div className="mb-1 flex items-center gap-2">
                <span className="text-sm font-bold text-slate-900">{aiRecommendation.name}</span>
                <span className="rounded bg-blue-50 px-1.5 py-0.5 text-xs font-semibold text-blue-600">
                  {aiRecommendation.score}점
                </span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="font-bold text-slate-900">{aiRecommendation.price}</span>
                <span className={`text-sm font-semibold ${aiRecommendation.isUp ? "text-red-500" : "text-blue-500"}`}>
                  {aiRecommendation.change}
                </span>
              </div>
            </div>

            {/* 최근 거래건 */}
            <div className="min-w-[200px] shrink-0 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
              <div className="mb-2">
                <span className="text-xs font-medium text-gray-500">최근 거래건</span>
              </div>
              <div className="mb-1 flex items-center gap-2">
                <span className="text-sm font-bold text-slate-900">{recentTrade.name}</span>
                <span
                  className={`rounded px-1.5 py-0.5 text-xs font-semibold ${
                    recentTrade.type === "매수"
                      ? "bg-red-50 text-red-500"
                      : "bg-blue-50 text-blue-500"
                  }`}
                >
                  {recentTrade.type}
                </span>
              </div>
              <span className="font-bold text-slate-900">{recentTrade.price}</span>
            </div>
          </>
        )}

        {/* 항상 표시: 코스피, 코스닥 */}
        {marketIndices.map((idx) => (
          <div key={idx.id} className="min-w-[180px] shrink-0 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
            <div className="mb-2">
              <span className="text-xs font-medium text-gray-500">{idx.name}</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="font-bold text-slate-900">{idx.value}</span>
              <span className={`text-sm font-semibold ${idx.isUp ? "text-red-500" : "text-blue-500"}`}>
                {idx.change} ({idx.percent})
              </span>
            </div>
          </div>
        ))}
      </section>

      {/* [2] 메인 주식 리스트 (탭 구조) */}
      <section className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
        {/* 탭 헤더 */}
        <div className="flex items-center gap-6 border-b border-gray-100 px-6">
          {(["popular", "mine"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`relative py-4 text-base font-bold transition-colors ${
                activeTab === tab ? "text-black" : "text-gray-400 hover:text-gray-600"
              }`}
            >
              {tab === "popular" ? "실시간 인기 종목" : "나의 종목"}
              {activeTab === tab && (
                <div className="absolute bottom-0 left-0 h-[2px] w-full bg-black" />
              )}
            </button>
          ))}
        </div>

        {/* 테이블 헤더 */}
        <div className="flex items-center bg-gray-50/50 px-6 py-3 text-xs font-medium text-gray-500">
          <div className="w-10 text-center">순위</div>
          <div className="ml-4 flex-1">종목명</div>
          <div className="w-24 text-right">현재가</div>
          <div className="w-24 text-right">등락률</div>
          <div className="hidden w-24 text-right sm:block">거래대금</div>
        </div>

        {/* 주식 리스트 */}
        <div className="flex flex-col">
          {currentList.map((stock) => (
            <div
              key={stock.id}
              className="flex cursor-pointer items-center border-b border-gray-50 px-6 py-4 transition-colors hover:bg-gray-50 last:border-none"
            >
              <div className="w-10 text-center text-sm font-semibold text-gray-400">{stock.rank}</div>
              <div className="ml-4 flex flex-1 items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-[10px] font-bold text-slate-500">
                  {stock.name.substring(0, 1)}
                </div>
                <span className="text-sm font-bold text-slate-900">{stock.name}</span>
              </div>
              <div className="w-24 text-right text-sm font-bold">{stock.price}</div>
              <div className={`w-24 text-right text-sm font-bold ${stock.isUp ? "text-red-500" : "text-blue-500"}`}>
                {stock.change}
              </div>
              <div className="hidden w-24 text-right text-sm font-medium text-gray-400 sm:block">
                {stock.volume}
              </div>
            </div>
          ))}
        </div>

        {currentList.length === 0 && (
          <div className="py-20 text-center text-sm text-gray-400">등록된 종목이 없습니다.</div>
        )}
      </section>
    </div>
  );
}
