"use client";

import React, { useState } from "react";
import { useSidebar } from "@/components/sidebar/SidebarContext";

export default function HomePage() {
  const { isOpen } = useSidebar();
  const sidebarWidth = isOpen ? "370px" : "56px";

  // 탭 상태 관리
  const [activeTab, setActiveTab] = useState<"popular" | "mine">("popular");

  // 1. 상단 증시 지수 목업 데이터
  const marketIndices = [
    {
      id: 1,
      name: "달러 환율",
      value: "1,345.50",
      change: "+0.50",
      percent: "+0.03%",
      isUp: true,
    },
    {
      id: 2,
      name: "코스피",
      value: "2,755.62",
      change: "-4.84",
      percent: "-0.18%",
      isUp: false,
    },
    {
      id: 3,
      name: "코스닥",
      value: "911.59",
      change: "+8.93",
      percent: "+0.98%",
      isUp: true,
    },
  ];

  // 2. 주식 리스트 목업 데이터
  const popularStocks = [
    {
      id: 1,
      rank: 1,
      name: "삼성전자",
      price: "81,200원",
      change: "+0.61%",
      isUp: true,
      volume: "431억원",
    },
    {
      id: 2,
      rank: 2,
      name: "SK하이닉스",
      price: "163,000원",
      change: "-1.25%",
      isUp: false,
      volume: "198억원",
    },
    {
      id: 3,
      rank: 3,
      name: "엔에이치스팩33호",
      price: "4,390원",
      change: "+119.50%",
      isUp: true,
      volume: "138억원",
    },
    {
      id: 4,
      rank: 4,
      name: "한화솔루션",
      price: "35,250원",
      change: "-4.21%",
      isUp: false,
      volume: "70억원",
    },
    {
      id: 5,
      rank: 5,
      name: "카카오",
      price: "55,400원",
      change: "+1.45%",
      isUp: true,
      volume: "67억원",
    },
  ];

  const myStocks = [
    {
      id: 1,
      rank: "-",
      name: "애플",
      price: "235,400원",
      change: "+1.20%",
      isUp: true,
      volume: "120억원",
    },
    {
      id: 2,
      rank: "-",
      name: "테슬라",
      price: "240,100원",
      change: "-3.15%",
      isUp: false,
      volume: "95억원",
    },
  ];

  const currentList = activeTab === "popular" ? popularStocks : myStocks;

  return (
    <div className="flex flex-col gap-8 pt-4 pb-10">
      {/* [1] 상단 가로 스크롤 증시 정보 */}
      <section>
        <div className="flex items-center gap-2 mb-4">
          <h2 className="text-xl font-bold">증시캘린더</h2>
          <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
            오늘
          </span>
        </div>

        {/* 가로 스크롤 컨테이너 (스크롤바 숨김 처리 포함) */}
        <div className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide">
          {marketIndices.map((index) => (
            <div
              key={index.id}
              className="min-w-[240px] snap-start flex items-center justify-between p-5 bg-white border border-gray-100 rounded-2xl shadow-[0_2px_10px_rgba(0,0,0,0.02)]"
            >
              <div>
                <p className="text-sm text-gray-500 mb-1">{index.name}</p>
                <div className="flex items-end gap-2">
                  <span className="text-xl font-bold">{index.value}</span>
                  <span
                    className={`text-sm font-semibold ${index.isUp ? "text-red-500" : "text-blue-500"}`}
                  >
                    {index.change} ({index.percent})
                  </span>
                </div>
              </div>
              {/* 임시 미니 차트 아이콘 (상승/하락에 따라 색상 변경) */}
              <div className="w-12 h-8 flex items-center justify-center opacity-50">
                <svg
                  width="40"
                  height="20"
                  viewBox="0 0 40 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
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

      {/* [2] 메인 주식 리스트 (탭 구조) */}
      <section className="bg-white border border-gray-100 rounded-2xl shadow-[0_2px_10px_rgba(0,0,0,0.02)] overflow-hidden">
        {/* 탭 헤더 */}
        <div className="flex items-center gap-6 px-6 border-b border-gray-100">
          <button
            onClick={() => setActiveTab("popular")}
            className={`py-4 text-base font-bold transition-colors relative ${
              activeTab === "popular"
                ? "text-black"
                : "text-gray-400 hover:text-gray-600"
            }`}
          >
            실시간 인기 종목
            {activeTab === "popular" && (
              <div className="absolute bottom-0 left-0 w-full h-[2px] bg-black" />
            )}
          </button>
          <button
            onClick={() => setActiveTab("mine")}
            className={`py-4 text-base font-bold transition-colors relative ${
              activeTab === "mine"
                ? "text-black"
                : "text-gray-400 hover:text-gray-600"
            }`}
          >
            나의 종목
            {activeTab === "mine" && (
              <div className="absolute bottom-0 left-0 w-full h-[2px] bg-black" />
            )}
          </button>
        </div>

        {/* 주식 리스트 테이블 헤더 (옵션) */}
        <div className="flex items-center px-6 py-3 bg-gray-50/50 text-xs text-gray-500 font-medium">
          <div className="w-10 text-center">순위</div>
          <div className="flex-1 ml-4">종목명</div>
          <div className="w-24 text-right">현재가</div>
          <div className="w-24 text-right">등락률</div>
          <div className="w-24 text-right hidden sm:block">거래대금</div>
        </div>

        {/* 주식 리스트 렌더링 */}
        <div className="flex flex-col">
          {currentList.map((stock) => (
            <div
              key={stock.id}
              className="flex items-center px-6 py-4 hover:bg-gray-50 transition-colors cursor-pointer border-b border-gray-50 last:border-none"
            >
              {/* 순위 */}
              <div className="w-10 text-center font-semibold text-gray-400">
                {stock.rank}
              </div>

              {/* 로고 & 종목명 */}
              <div className="flex-1 flex items-center gap-3 ml-4">
                <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-500">
                  {stock.name.substring(0, 1)}
                </div>
                <span className="font-bold text-sm text-slate-900">
                  {stock.name}
                </span>
              </div>

              {/* 현재가 */}
              <div className="w-24 text-right font-bold text-sm">
                {stock.price}
              </div>

              {/* 등락률 */}
              <div
                className={`w-24 text-right font-bold text-sm ${stock.isUp ? "text-red-500" : "text-blue-500"}`}
              >
                {stock.change}
              </div>

              {/* 거래대금 (모바일에서는 숨김 처리) */}
              <div className="w-24 text-right text-sm text-gray-400 font-medium hidden sm:block">
                {stock.volume}
              </div>
            </div>
          ))}
        </div>

        {/* 리스트가 비어있을 경우 (내 종목 탭 등) */}
        {currentList.length === 0 && (
          <div className="py-20 text-center text-gray-400 text-sm">
            등록된 종목이 없습니다.
          </div>
        )}
      </section>
    </div>
  );
}
