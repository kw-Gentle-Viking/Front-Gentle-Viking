"use client";

import React, { useState } from "react";
import {
  mockMarketIndices,
  mockPopularStocks,
  mockMyStocks,
} from "@/lib/dashboard/mock";

function fmtPrice(v: number) {
  return v.toLocaleString("ko-KR");
}

function fmtVolume(v: number) {
  if (v >= 100000000) return `${(v / 100000000).toFixed(0)}억원`;
  if (v >= 10000) return `${(v / 10000).toFixed(0)}만원`;
  return `${v}원`;
}

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<"popular" | "mine">("popular");

  const currentList =
    activeTab === "popular" ? mockPopularStocks : mockMyStocks;

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
              onClick={() => setActiveTab(tab)}
              className={`py-4 text-base font-bold transition-colors relative ${
                activeTab === tab
                  ? "text-black"
                  : "text-gray-400 hover:text-gray-600"
              }`}
            >
              {tab === "popular" ? "실시간 인기 종목" : "나의 종목"}
              {activeTab === tab && (
                <div className="absolute bottom-0 left-0 w-full h-[2px] bg-black" />
              )}
            </button>
          ))}
        </div>

        {/* 테이블 헤더 */}
        <div className="flex items-center px-6 py-3 bg-gray-50/50 text-xs text-gray-500 font-medium">
          <div className="w-10 text-center">순위</div>
          <div className="flex-1 ml-4">종목명</div>
          <div className="w-28 text-right">현재가</div>
          <div className="w-24 text-right">등락률</div>
          <div className="w-28 text-right hidden sm:block">거래대금</div>
        </div>

        {/* 종목 리스트 */}
        <div className="flex flex-col">
          {currentList.map((stock) => (
            <div
              key={stock.id}
              className="flex items-center px-6 py-4 hover:bg-gray-50 transition-colors cursor-pointer border-b border-gray-50 last:border-none"
            >
              <div className="w-10 text-center font-semibold text-gray-400">
                {stock.rank}
              </div>
              <div className="flex-1 flex items-center gap-3 ml-4">
                <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-500">
                  {stock.name.substring(0, 1)}
                </div>
                <div>
                  <p className="font-bold text-sm text-slate-900">
                    {stock.name}
                  </p>
                  <p className="text-[11px] text-gray-400">{stock.stockCode}</p>
                </div>
              </div>
              <div className="w-28 text-right font-bold text-sm">
                {fmtPrice(stock.priceKRW)}원
              </div>
              <div
                className={`w-24 text-right font-bold text-sm ${stock.isUp ? "text-red-500" : "text-blue-500"}`}
              >
                {stock.isUp ? "+" : ""}
                {stock.changePercent.toFixed(2)}%
              </div>
              <div className="w-28 text-right text-sm text-gray-400 font-medium hidden sm:block">
                {fmtVolume(stock.volumeKRW)}
              </div>
            </div>
          ))}
          {currentList.length === 0 && (
            <div className="py-20 text-center text-gray-400 text-sm">
              등록된 종목이 없습니다.
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
