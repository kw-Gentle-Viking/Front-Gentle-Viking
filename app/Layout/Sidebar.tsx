"use client";

import { usePathname } from "next/navigation";
import { useSidebar } from "@/components/sidebar/SidebarContext";
import { LuPanelRightOpen } from "react-icons/lu";
import { LuPanelLeftOpen } from "react-icons/lu";
import { GoGraph } from "react-icons/go";
import { FaHeart } from "react-icons/fa";
import { IoTime } from "react-icons/io5";
import { useFavorites } from "@/components/favorites/FavoritesContext";
import { usePortfolio } from "@/components/portfolio/PortfolioContext";
import { mockPopularStocks } from "@/lib/dashboard/mock";
import { mockAccountAssets, mockOrders, mockStockPnl } from "@/lib/mypage/mock";

const Sidebar = () => {
  const pathname = usePathname();
  const { isOpen, activeTab, openSidebar, closeSidebar } = useSidebar();
  const { isFavorited } = useFavorites();
  const { inPortfolio } = usePortfolio();
  const favStocks = mockPopularStocks.filter((s) => isFavorited(s.stockCode));

  const pnlMap = new Map(mockStockPnl.map((s) => [s.stockCode, s]));
  const allStocks = [
    ...mockPopularStocks,
    ...mockStockPnl
      .filter((s) => !mockPopularStocks.some((p) => p.stockCode === s.stockCode))
      .map((s) => ({ stockCode: s.stockCode, name: s.stockName, priceKRW: 0, isUp: s.pnlRate >= 0, changePercent: s.pnlRate })),
  ];
  const portfolioStocks = allStocks.filter((s) => inPortfolio(s.stockCode));

  const isStandalonePage =
    pathname === "/" || pathname === "/login" || pathname === "/signup";

  if (isStandalonePage) {
    return null;
  }

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
      case "portfolio": {
        const { investedKRW, investedPnlKRW, investedPnlRate } = mockAccountAssets;
        return (
          <div className="animate-fadeIn">
            <h2 className="text-lg font-bold mb-3">내 투자 현황</h2>
            <div className="p-4 bg-gray-50 rounded-xl mb-4">
              <p className="text-xs text-gray-400 mb-1">총 투자금액</p>
              <p className="text-lg font-black text-slate-900">
                {investedKRW.toLocaleString("ko-KR")}원
              </p>
              <div className={`mt-1 flex items-center gap-1 text-sm font-bold ${investedPnlRate >= 0 ? "text-red-500" : "text-blue-500"}`}>
                <span>{investedPnlRate >= 0 ? "+" : ""}{investedPnlRate.toFixed(2)}%</span>
                <span className="font-medium text-xs">
                  ({investedPnlKRW >= 0 ? "+" : ""}{investedPnlKRW.toLocaleString("ko-KR")}원)
                </span>
              </div>
            </div>
            {portfolioStocks.length === 0 ? (
              <p className="text-sm text-gray-400 text-center py-8">
                AI 리포트에서 종목을 담아보세요.
              </p>
            ) : (
              <div className="space-y-1">
                {portfolioStocks.map((stock) => {
                  const pnl = pnlMap.get(stock.stockCode);
                  return (
                    <div
                      key={stock.stockCode}
                      className="flex justify-between items-center px-3 py-2.5 hover:bg-gray-100 rounded-xl cursor-pointer transition-colors"
                    >
                      <div>
                        <p className="font-semibold text-sm text-gray-800">{stock.name}</p>
                        <p className="text-[11px] text-gray-400">{stock.stockCode}</p>
                      </div>
                      <div className="text-right">
                        {stock.priceKRW > 0 && (
                          <p className="text-sm font-semibold text-gray-800">
                            {stock.priceKRW.toLocaleString("ko-KR")}원
                          </p>
                        )}
                        {pnl ? (
                          <p className={`text-xs font-bold ${pnl.pnlRate >= 0 ? "text-red-500" : "text-blue-500"}`}>
                            {pnl.pnlRate >= 0 ? "+" : ""}{pnl.pnlRate.toFixed(1)}%
                          </p>
                        ) : (
                          <p className={`text-xs font-bold ${stock.isUp ? "text-red-500" : "text-blue-500"}`}>
                            {stock.isUp ? "+" : ""}{stock.changePercent.toFixed(2)}%
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        );
      }
      case "favorite":
        return (
          <div className="animate-fadeIn">
            <h2 className="text-lg font-bold mb-4">관심 종목</h2>
            {favStocks.length === 0 ? (
              <p className="text-sm text-gray-400 text-center py-8">
                하트를 눌러 관심 종목을 추가해보세요.
              </p>
            ) : (
              <div className="space-y-1">
                {favStocks.map((stock) => (
                  <div
                    key={stock.stockCode}
                    className="flex justify-between items-center px-3 py-2.5 hover:bg-gray-100 rounded-xl cursor-pointer transition-colors"
                  >
                    <div>
                      <p className="font-semibold text-sm text-gray-800">{stock.name}</p>
                      <p className="text-[11px] text-gray-400">{stock.stockCode}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold text-gray-800">
                        {stock.priceKRW.toLocaleString("ko-KR")}원
                      </p>
                      <p className={`text-xs font-bold ${stock.isUp ? "text-red-500" : "text-blue-500"}`}>
                        {stock.isUp ? "+" : ""}{stock.changePercent.toFixed(2)}%
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      case "history":
        return (
          <div className="animate-fadeIn">
            <h2 className="text-lg font-bold mb-4">최근 거래 내역</h2>
            <div className="space-y-1">
              {mockOrders.map((order) => (
                <div
                  key={order.id}
                  className="px-3 py-2.5 hover:bg-gray-100 rounded-xl transition-colors"
                >
                  <div className="flex items-center justify-between mb-0.5">
                    <div className="flex items-center gap-1.5">
                      <span className={`text-xs font-bold ${order.type === "매수" ? "text-red-500" : "text-blue-500"}`}>
                        {order.type}
                      </span>
                      <span className="font-semibold text-sm text-gray-800">{order.stockName}</span>
                    </div>
                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                      order.status === "체결"
                        ? "bg-green-50 text-green-600"
                        : order.status === "미체결"
                          ? "bg-yellow-50 text-yellow-600"
                          : "bg-gray-100 text-gray-400"
                    }`}>
                      {order.status}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-400">{order.datetime.slice(5)}</span>
                    <span className="text-xs text-gray-500">
                      {order.orderQty}주 · {order.orderPrice.toLocaleString("ko-KR")}원
                    </span>
                  </div>
                </div>
              ))}
            </div>
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
