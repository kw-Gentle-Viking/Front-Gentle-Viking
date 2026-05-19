"use client";

import { useEffect, useState } from "react";
import {
  mockGeneratedAt,
  mockReports,
  mockTendency,
  mockUserName,
} from "@/lib/ai-report/mock";
import AIStockChart from "@/components/ai-report/AIStockChart";
import { useFavorites } from "@/components/favorites/FavoritesContext";
import { usePortfolio } from "@/components/portfolio/PortfolioContext";
import { AUTH_EVENT_NAME, AuthUser, getCurrentUser } from "@/lib/signup/auth";

const TENDENCY_COLOR: Record<string, string> = {
  안정형: "text-blue-500",
  안정추구형: "text-cyan-500",
  위험중립형: "text-green-600",
  적극투자형: "text-orange-500",
  공격투자형: "text-violet-600",
};

function ScoreBar({ score }: { score: number }) {
  const bar =
    score >= 80
      ? "bg-red-500"
      : score >= 65
        ? "bg-orange-400"
        : score >= 50
          ? "bg-yellow-400"
          : "bg-blue-400";
  const text =
    score >= 80
      ? "text-red-500"
      : score >= 65
        ? "text-orange-500"
        : score >= 50
          ? "text-yellow-600"
          : "text-blue-500";

  return (
    <div className="flex items-center gap-3">
      <span className={`text-3xl font-black tabular-nums ${text}`}>
        {score}점
      </span>
      <div className="flex-1 h-2 rounded-full bg-gray-100 overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-500 ${bar}`}
          style={{ width: `${score}%` }}
        />
      </div>
      <span className="text-xs text-gray-400 shrink-0">100점</span>
    </div>
  );
}

type PortfolioModal = {
  stockName: string;
  stockCode: string;
  action: "add" | "remove";
} | null;

export default function AIReportPage() {
  const [selectedId, setSelectedId] = useState<number>(mockReports[0].id);
  const [portfolioModal, setPortfolioModal] = useState<PortfolioModal>(null);
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(null);
  const { isFavorited, toggleFavorite } = useFavorites();
  const { inPortfolio, togglePortfolio } = usePortfolio();
  const selected =
    mockReports.find((r) => r.id === selectedId) ?? mockReports[0];

  useEffect(() => {
    const sync = () => setCurrentUser(getCurrentUser());
    sync();
    window.addEventListener(AUTH_EVENT_NAME, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(AUTH_EVENT_NAME, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  const userName = currentUser?.nickname ?? mockUserName;
  const tendency = currentUser?.riskLabel ?? mockTendency;

  function handleBagClick(
    e: React.MouseEvent,
    stockCode: string,
    stockName: string,
  ) {
    e.stopPropagation();
    const action = inPortfolio(stockCode) ? "remove" : "add";
    setPortfolioModal({ stockName, action, stockCode });
  }

  function confirmPortfolioModal() {
    if (!portfolioModal) return;
    togglePortfolio(portfolioModal.stockCode);
    setPortfolioModal(null);
  }

  return (
    <>
      {portfolioModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
          <div className="bg-white rounded-2xl shadow-xl w-80 p-6 flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <svg
                className={`w-5 h-5 shrink-0 ${portfolioModal.action === "add" ? "text-yellow-400" : "text-gray-400"}`}
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M19 6h-2a5 5 0 00-10 0H5a2 2 0 00-2 2l1.34 9.39A2 2 0 006.32 19h11.36a2 2 0 001.98-1.61L21 8a2 2 0 00-2-2zm-7-3a3 3 0 013 3H9a3 3 0 013-3z" />
              </svg>
              <p className="font-bold text-slate-900 text-base">
                포트폴리오 {portfolioModal.action === "add" ? "추가" : "해제"}
              </p>
            </div>
            {portfolioModal.action === "add" ? (
              <p className="text-sm text-gray-600 leading-relaxed">
                <span className="font-semibold text-slate-900">
                  {portfolioModal.stockName}
                </span>{" "}
                종목을 포트폴리오에 추가합니다.
                <br />
                <br />
                자동매매인 경우 익영업일 주식 장 시작부터 적용됩니다.
              </p>
            ) : (
              <p className="text-sm text-gray-600 leading-relaxed">
                <span className="font-semibold text-slate-900">
                  {portfolioModal.stockName}
                </span>{" "}
                종목을 포트폴리오에서 제거합니다.
                <br />
                <br />
                자동매매인 경우 익영업일 주식 장 시작부터 중단됩니다.
              </p>
            )}
            <div className="mt-1 flex gap-2">
              <button
                onClick={() => setPortfolioModal(null)}
                className="flex-1 py-2.5 rounded-xl border border-gray-200 text-sm font-bold text-gray-500 hover:bg-gray-50 transition-colors"
              >
                취소
              </button>
              <button
                onClick={confirmPortfolioModal}
                className="flex-1 py-2.5 rounded-xl bg-slate-900 text-white text-sm font-bold hover:bg-slate-700 transition-colors"
              >
                확인
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="flex -mx-6 min-h-[calc(100vh-72px)]">
        {/* ── 왼쪽 사이드바 ── */}
        <aside className="w-72 shrink-0 bg-white border-r border-gray-100 flex flex-col">
          {/* 헤더 */}
          <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between sticky top-0 bg-white z-10">
            <h2 className="text-base font-bold text-slate-900">오늘의 종목</h2>
            <span className="flex items-center gap-1 text-xs text-gray-400">
              <svg
                className="w-3.5 h-3.5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              {mockGeneratedAt} 생성
            </span>
          </div>

          {/* 종목 카드 리스트 */}
          <div className="flex-1 divide-y divide-gray-100 overflow-y-auto">
            {mockReports.map((report) => (
              <div
                key={report.id}
                onClick={() => setSelectedId(report.id)}
                className={`px-5 py-4 cursor-pointer transition-colors ${
                  selectedId === report.id
                    ? "bg-white"
                    : "bg-gray-50 hover:bg-gray-100"
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-sm text-slate-900">
                    {report.stockName}
                  </span>
                  <div className="flex items-center gap-1.5">
                    <span className="text-sm font-semibold text-slate-700">
                      {report.priceKRW.toLocaleString("ko-KR")}원
                    </span>
                    <button
                      onClick={(e) =>
                        handleBagClick(e, report.stockCode, report.stockName)
                      }
                      className="hover:scale-110 transition-transform"
                    >
                      {inPortfolio(report.stockCode) ? (
                        <svg
                          className="w-4 h-4 text-yellow-400"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                        >
                          <path d="M19 6h-2a5 5 0 00-10 0H5a2 2 0 00-2 2l1.34 9.39A2 2 0 006.32 19h11.36a2 2 0 001.98-1.61L21 8a2 2 0 00-2-2zm-7-3a3 3 0 013 3H9a3 3 0 013-3z" />
                        </svg>
                      ) : (
                        <svg
                          className="w-4 h-4"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="#d1d5db"
                          strokeWidth="2"
                          strokeLinejoin="round"
                        >
                          <path d="M19 6h-2a5 5 0 00-10 0H5a2 2 0 00-2 2l1.34 9.39A2 2 0 006.32 19h11.36a2 2 0 001.98-1.61L21 8a2 2 0 00-2-2zm-7-3a3 3 0 013 3H9a3 3 0 013-3z" />
                        </svg>
                      )}
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite(report.stockCode);
                      }}
                      className="hover:scale-110 transition-transform"
                    >
                      {isFavorited(report.stockCode) ? (
                        <svg
                          className="w-4 h-4"
                          viewBox="0 0 24 24"
                          fill="#ef4444"
                        >
                          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                        </svg>
                      ) : (
                        <svg
                          className="w-4 h-4"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="#d1d5db"
                          strokeWidth="2"
                          strokeLinejoin="round"
                        >
                          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>
                <p className="text-xs text-gray-500 mb-1.5">
                  추천 점수 {report.score}점
                </p>
                <p className="text-xs text-gray-400 leading-relaxed line-clamp-3">
                  {report.shortSummary}
                </p>
              </div>
            ))}
          </div>
        </aside>

        {/* ── 메인 콘텐츠 ── */}
        <main className="flex-1 min-w-0 px-8 py-6 overflow-y-auto">
          {/* 투자 성향 헤더 */}
          <p className="text-xl font-bold text-slate-900 mb-6">
            {userName} 님의 투자 성향은{" "}
            <span className={TENDENCY_COLOR[tendency] ?? "text-violet-600"}>
              {tendency}
            </span>
            입니다.
          </p>

          {/* 종목 정보 */}
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-sm font-bold text-slate-500 shrink-0">
              {selected.stockName.substring(0, 1)}
            </div>
            <div>
              <p className="font-bold text-slate-900">{selected.stockName}</p>
              <p className="text-sm">
                <span className="font-semibold">
                  {selected.priceKRW.toLocaleString("ko-KR")}원
                </span>{" "}
                <span
                  className={selected.isUp ? "text-red-500" : "text-blue-500"}
                >
                  {selected.isUp ? "+" : ""}
                  {selected.changePercent.toFixed(2)}%
                </span>
              </p>
            </div>
          </div>

          {/* 캔들차트 */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-[0_2px_10px_rgba(0,0,0,0.02)] p-5 mb-4">
            <AIStockChart
              stockId={selected.id}
              currentPrice={selected.priceKRW}
            />
          </div>

          {/* 추천 점수 */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-[0_2px_10px_rgba(0,0,0,0.02)] p-5 mb-4">
            <p className="text-sm font-bold text-slate-900 mb-3">
              추천 점수 {selected.score}점
            </p>
            <ScoreBar score={selected.score} />
          </div>

          {/* 핵심 요약 */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-[0_2px_10px_rgba(0,0,0,0.02)] p-5 mb-4">
            <h3 className="text-sm font-bold text-slate-900 mb-2">핵심 요약</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              {selected.fullSummary}
            </p>
          </div>

          {/* 관련 뉴스 */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-[0_2px_10px_rgba(0,0,0,0.02)] p-5 mb-6">
            <h3 className="text-sm font-bold text-slate-900 mb-4">관련 뉴스</h3>
            <div className="space-y-4">
              {selected.news.map((item, i) => (
                <div key={i} className="flex gap-3">
                  <span
                    className={`shrink-0 text-xs font-bold px-2 py-0.5 rounded-md h-fit mt-0.5 ${
                      item.sentiment === "긍정"
                        ? "bg-red-50 text-red-500"
                        : "bg-blue-50 text-blue-500"
                    }`}
                  >
                    {item.sentiment}
                  </span>
                  <div className="min-w-0">
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {item.summary}
                    </p>
                    {item.source && (
                      <p className="mt-1 text-xs text-blue-400">
                        [{item.source}
                        {item.date ? ` - ${item.date}` : ""}]
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* AI 시그널 버튼 */}
          <div className="flex justify-end">
            <button className="flex items-center gap-2.5 bg-blue-50 hover:bg-blue-100 text-blue-600 font-bold text-sm px-5 py-3 rounded-xl transition-colors">
              AI 시그널 확인하기
              <svg
                className="w-4 h-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 8 16 12 12 16" />
                <line x1="8" y1="12" x2="16" y2="12" />
              </svg>
            </button>
          </div>
        </main>
      </div>
    </>
  );
}
