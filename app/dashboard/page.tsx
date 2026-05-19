"use client";

import { useState } from "react";
import { mockMarketIndices, mockPopularStocks } from "@/lib/dashboard/mock";
import StockChartPanel from "@/components/dashboard/StockChartPanel";

function fmtPrice(v: number) {
  return v.toLocaleString("ko-KR");
}

function fmtVolume(v: number) {
  if (v >= 100000000) return `${(v / 100000000).toFixed(0)}억원`;
  if (v >= 10000) return `${(v / 10000).toFixed(0)}만원`;
  return `${v}원`;
}

function HeartIcon({ filled }: { filled: boolean }) {
  return filled ? (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="#ef4444">
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    </svg>
  ) : (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="#d1d5db" strokeWidth="2" strokeLinejoin="round">
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    </svg>
  );
}

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<"popular" | "mine">("popular");
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [favorites, setFavorites] = useState<Set<string>>(
    () => new Set(["005930", "000660"]),
  );

  const myStocks = mockPopularStocks
    .filter((s) => favorites.has(s.stockCode))
    .map((s) => ({ ...s, rank: "-" as const }));

  const currentList = activeTab === "popular" ? mockPopularStocks : myStocks;

  function handleTabChange(tab: "popular" | "mine") {
    setActiveTab(tab);
    setSelectedId(null);
  }

  function handleRowClick(id: number) {
    setSelectedId((prev) => (prev === id ? null : id));
  }

  function toggleFavorite(e: React.MouseEvent, stockCode: string) {
    e.stopPropagation();
    setFavorites((prev) => {
      const next = new Set(prev);
      if (next.has(stockCode)) next.delete(stockCode);
      else next.add(stockCode);
      return next;
    });
  }

  return (
    <div className="flex flex-col gap-8 pt-4 pb-10">
      {/* [1] 증시 지수 */}
      <section>
        <div className="flex items-center gap-2 mb-4">
          <h2 className="text-xl font-bold">증시 현황</h2>
          <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
            오늘
          </span>
        </div>

        <div className="flex gap-4 overflow-x-auto pb-2 snap-x snap-mandatory">
          {mockMarketIndices.map((index) => (
            <div
              key={index.id}
              className="min-w-[220px] snap-start flex items-center justify-between p-5 bg-white border border-gray-100 rounded-2xl shadow-[0_2px_10px_rgba(0,0,0,0.02)]"
            >
              <div>
                <p className="text-sm text-gray-500 mb-1">{index.name}</p>
                <p className="text-xl font-bold">{fmtPrice(index.value)}</p>
                <p
                  className={`mt-1 text-sm font-semibold ${index.isUp ? "text-red-500" : "text-blue-500"}`}
                >
                  {index.isUp ? "+" : ""}
                  {index.change.toFixed(2)} ({index.isUp ? "+" : ""}
                  {index.changePercent.toFixed(2)}%)
                </p>
              </div>
              <div className="w-12 h-8 flex items-center justify-center opacity-50">
                <svg width="40" height="20" viewBox="0 0 40 20" fill="none">
                  <path
                    d="M0 15 Q 10 5, 20 10 T 40 5"
                    stroke={index.isUp ? "#ef4444" : "#3b82f6"}
                    strokeWidth="2"
                    fill="none"
                  />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* [2] 주식 리스트 */}
      <section className="bg-white border border-gray-100 rounded-2xl shadow-[0_2px_10px_rgba(0,0,0,0.02)] overflow-hidden">
        {/* 탭 헤더 */}
        <div className="flex items-center gap-6 px-6 border-b border-gray-100">
          {(["popular", "mine"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => handleTabChange(tab)}
              className={`py-4 text-base font-bold transition-colors relative ${
                activeTab === tab
                  ? "text-black"
                  : "text-gray-400 hover:text-gray-600"
              }`}
            >
              {tab === "popular" ? "실시간 인기 종목" : "나의 종목"}
              {tab === "mine" && favorites.size > 0 && (
                <span className="ml-1.5 text-xs font-bold text-red-500">
                  {favorites.size}
                </span>
              )}
              {activeTab === tab && (
                <div className="absolute bottom-0 left-0 w-full h-[2px] bg-black" />
              )}
            </button>
          ))}
        </div>

        {/* 테이블 헤더 */}
        <div className="flex items-center px-6 py-3 bg-gray-50/50 text-xs text-gray-500 font-medium">
          <div className="w-8 shrink-0" />
          <div className="w-10 text-center shrink-0">순위</div>
          <div className="flex-1 ml-4">종목명</div>
          <div className="w-28 text-right shrink-0">현재가</div>
          <div className="w-24 text-right shrink-0">등락률</div>
          <div className="w-28 text-right shrink-0 hidden sm:block">거래대금</div>
        </div>

        {/* 종목 리스트 */}
        <div className="flex flex-col">
          {currentList.map((stock) => (
            <div
              key={stock.stockCode}
              className="border-b border-gray-50 last:border-none"
            >
              {/* 종목 행 */}
              <div
                onClick={() => handleRowClick(stock.id)}
                className={`flex items-center px-6 py-4 transition-colors cursor-pointer ${
                  selectedId === stock.id ? "bg-gray-50" : "hover:bg-gray-50"
                }`}
              >
                {/* 하트 즐겨찾기 */}
                <button
                  onClick={(e) => toggleFavorite(e, stock.stockCode)}
                  className="w-8 shrink-0 flex justify-center items-center hover:scale-110 transition-transform"
                >
                  <HeartIcon filled={favorites.has(stock.stockCode)} />
                </button>

                <div className="w-10 text-center font-semibold text-gray-400 shrink-0">
                  {stock.rank}
                </div>
                <div className="flex-1 flex items-center gap-3 ml-4 min-w-0">
                  <div className="w-8 h-8 shrink-0 rounded-full bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-500">
                    {stock.name.substring(0, 1)}
                  </div>
                  <div className="min-w-0">
                    <p className="font-bold text-sm text-slate-900 truncate">
                      {stock.name}
                    </p>
                    <p className="text-[11px] text-gray-400">{stock.stockCode}</p>
                  </div>
                </div>
                <div className="w-28 text-right font-bold text-sm shrink-0">
                  {fmtPrice(stock.priceKRW)}원
                </div>
                <div
                  className={`w-24 text-right font-bold text-sm shrink-0 ${stock.isUp ? "text-red-500" : "text-blue-500"}`}
                >
                  {stock.isUp ? "+" : ""}
                  {stock.changePercent.toFixed(2)}%
                </div>
                <div className="w-28 text-right text-sm text-gray-400 font-medium shrink-0 hidden sm:block">
                  {fmtVolume(stock.volumeKRW)}
                </div>
              </div>

              {/* 인라인 캔들차트 */}
              {selectedId === stock.id && (
                <div className="px-6 py-4 border-t border-gray-100 bg-white">
                  <StockChartPanel
                    stockId={stock.id}
                    currentPrice={stock.priceKRW}
                  />
                </div>
              )}
            </div>
          ))}
          {currentList.length === 0 && (
            <div className="py-20 text-center text-gray-400 text-sm">
              {activeTab === "mine"
                ? "하트를 눌러 관심 종목을 추가해보세요."
                : "등록된 종목이 없습니다."}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
