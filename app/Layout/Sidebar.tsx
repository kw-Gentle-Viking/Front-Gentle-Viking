"use client";

import React from "react";
import { useSidebar } from "@/components/sidebar/SidebarContext";
import { LuPanelRightOpen } from "react-icons/lu";
import { LuPanelLeftOpen } from "react-icons/lu";
import { GoGraph } from "react-icons/go";
import { FaHeart } from "react-icons/fa";
import { IoTime } from "react-icons/io5";

const Sidebar = () => {
  const { isOpen, activeTab, openSidebar, closeSidebar } = useSidebar();

  // 1. 아이콘 데이터 맵핑 (Context의 SidebarTab 타입과 일치)
  const tabs = [
    {
      id: "portfolio" as const,
      label: "내투자",
      icon: <GoGraph size={24} />,
    },
    {
      id: "favorite" as const,
      label: "관심",
      icon: <FaHeart size={24} />,
    },
    {
      id: "history" as const,
      label: "최근 거래",
      icon: <IoTime size={24} />,
    },
  ];

  // 2. 탭별 컨텐츠 렌더링
  const renderTabContent = () => {
    switch (activeTab) {
      case "portfolio":
        return (
          <div className="animate-fadeIn">
            <h2 className="text-lg font-bold mb-4">내 투자 현황</h2>
            <div className="p-4 bg-gray-50 rounded-xl">
              자산 요약 정보가 표시됩니다.
            </div>
          </div>
        );
      case "favorite":
        return (
          <div className="animate-fadeIn">
            <h2 className="text-lg font-bold mb-4">관심 종목 TOP 10</h2>
            <div className="space-y-2">
              {/* 예시 리스트 */}
              <div className="flex justify-between items-center p-3 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors">
                <span className="font-medium text-sm text-gray-700">
                  삼성전자
                </span>
                <span className="text-red-500 text-sm font-semibold">
                  +0.61%
                </span>
              </div>
            </div>
          </div>
        );
      case "history":
        return (
          <div className="animate-fadeIn">
            <h2 className="text-lg font-bold mb-4">최근 거래 내역</h2>
            <p className="text-sm text-gray-400">
              최근 7일간 거래 내역이 없습니다.
            </p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <aside className="fixed right-0 h-[650px] flex z-40 bg-[#E6E8EB] shadow-lg">
      {/* isOpen 상태로 넓이 조절 */}
      <div
        className={`
        overflow-hidden transition-all duration-300 ease-in-out border-l border-gray-100
        ${isOpen ? "w-[314px] opacity-100" : "w-0 opacity-0"}
      `}
      >
        <div className="w-[314px] p-6 h-full overflow-y-auto">
          {renderTabContent()}
        </div>
      </div>

      {/* 사이드 바 버튼 리스트 */}
      <div className="w-[56px] flex flex-col items-center py-2 border-l border-gray-100 shrink-0">
        <button
          onClick={isOpen ? closeSidebar : () => openSidebar(activeTab)}
          className="p-3 mb-6 text-[#6B7684] hover:text-[#333D4B] transition-colors"
          title={isOpen ? "사이드바 닫기" : "사이드바 열기"}
        >
          {isOpen ? (
            <LuPanelLeftOpen size={24} />
          ) : (
            <LuPanelRightOpen size={24} />
          )}
        </button>

        <div className="flex flex-col gap-2 w-full">
          {tabs.map((tab) => {
            const isActive = isOpen && activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => openSidebar(tab.id)}
                className={`
                  relative flex flex-col items-center justify-center py-4 w-full transition-all
                  ${isActive ? "text-[#333D4B] font-bold" : "text-[#6B7684] hover:text-[#333D4B]"}
                `}
              >
                {/* 활성화 표시 바 (왼쪽 선) */}
                {isActive && (
                  <div className="absolute left-0 w-[3px] h-full bg-[#333D4B]" />
                )}

                {tab.icon}
                <span className="text-[10px] mt-1 tracking-tighter">
                  {tab.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
