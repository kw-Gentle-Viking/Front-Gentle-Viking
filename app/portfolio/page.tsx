"use client";

import { useMemo, useState } from "react";
import { usePortfolio } from "@/components/portfolio/PortfolioContext";
import { mockPopularStocks } from "@/lib/dashboard/mock";
import { mockStockPnl } from "@/lib/mypage/mock";
import { mockAISignals } from "@/lib/portfolio/mock";
import type { AISignalCard, SignalDecision } from "@/lib/portfolio/types";

function seededRng(seed: number) {
  let s = (Math.abs(Math.floor(seed)) | 1) & 0x7fffffff;
  return () => {
    s = (s * 1664525 + 1013904223) & 0x7fffffff;
    return s / 0x7fffffff;
  };
}

function Sparkline({ stockCode, pnlRate }: { stockCode: string; pnlRate: number }) {
  const points = useMemo(() => {
    const rng = seededRng(stockCode.split("").reduce((a, c) => a + c.charCodeAt(0), 0));
    const raw = Array.from({ length: 24 }, () => rng());
    const min = Math.min(...raw);
    const max = Math.max(...raw);
    return raw.map((v, i) => ({
      x: (i / 23) * 180,
      y: 36 - ((v - min) / (max - min + 0.001)) * 32,
    }));
  }, [stockCode]);

  const d = points.map((p, i) => `${i === 0 ? "M" : "L"}${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(" ");
  const color = pnlRate >= 0 ? "#ef4444" : "#3b82f6";

  return (
    <svg width="180" height="40" viewBox="0 0 180 40" className="overflow-visible">
      <path d={d} stroke={color} strokeWidth="1.5" fill="none" strokeLinejoin="round" />
    </svg>
  );
}

const DECISION_STYLE: Record<SignalDecision, { badge: string; text: string }> = {
  관망: { badge: "bg-gray-100 text-gray-500", text: "text-gray-600" },
  매수: { badge: "bg-red-50 text-red-500", text: "text-red-600" },
  매도: { badge: "bg-blue-50 text-blue-500", text: "text-blue-600" },
};

function SignalCardItem({ card, defaultOpen }: { card: AISignalCard; defaultOpen: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  const ds = DECISION_STYLE[card.decision];

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-[0_2px_10px_rgba(0,0,0,0.02)] overflow-hidden">
      {/* 카드 헤더 */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full text-left px-5 py-4"
      >
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-gray-400">{card.datetime}</span>
          <span className="text-xs font-bold text-violet-600 bg-violet-50 px-2 py-0.5 rounded-full">
            Genvi AI
          </span>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-sm font-bold text-slate-800">
            {card.stockName}{" "}
            <span className={card.signal === "매수" ? "text-red-500" : "text-blue-500"}>
              {card.signal} 시그널
            </span>{" "}
            <span className="text-gray-500 font-medium">
              {card.qty} | 판량 {card.volume} | 위도 {card.riskLevel}
            </span>
          </p>
          <div className="flex items-center gap-2">
            <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${ds.badge}`}>
              {card.decision} 결정
            </span>
            <svg
              className={`w-4 h-4 text-gray-400 transition-transform ${open ? "rotate-180" : ""}`}
              viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </div>
        </div>
        <p className="text-[11px] text-gray-400 mt-1">Signal Test</p>
      </button>

      {/* 펼쳐진 상세 */}
      {open && (
        <div className="border-t border-gray-100 px-5 pb-5">
          <p className="text-sm font-bold text-slate-900 mt-4 mb-1">{card.stockName}</p>
          <p className="text-xs text-gray-400 mb-4">{card.strategy}</p>

          <div className="flex gap-6 mb-4">
            <div>
              <p className="text-[11px] text-gray-400 mb-0.5">이전 자산</p>
              <p className="text-sm font-semibold text-slate-700">
                {card.prevAssetKRW.toLocaleString("ko-KR")}원
              </p>
            </div>
            <div>
              <p className="text-[11px] text-gray-400 mb-0.5">최종 자산</p>
              <p className="text-sm font-semibold text-slate-700">
                {card.finalAssetKRW.toLocaleString("ko-KR")}원{" "}
                <span className={`text-xs font-bold ${card.pnlRate >= 0 ? "text-red-500" : "text-blue-500"}`}>
                  ({card.pnlKRW >= 0 ? "+" : ""}{card.pnlKRW.toLocaleString("ko-KR")}원,{" "}
                  {card.pnlRate >= 0 ? "+" : ""}{card.pnlRate.toFixed(2)}%)
                </span>
              </p>
            </div>
          </div>

          <div className="mb-4">
            <Sparkline stockCode={card.stockCode + card.id} pnlRate={card.pnlRate} />
          </div>

          <div className={`rounded-xl p-4 ${ds.badge.split(" ")[0]} bg-opacity-50`}>
            <p className={`text-xs font-bold mb-1 ${ds.text}`}>{card.decision} 결정</p>
            <p className="text-xs text-gray-600 leading-relaxed">{card.decisionReason}</p>
          </div>
        </div>
      )}
    </div>
  );
}

type PortfolioModal = { stockName: string; stockCode: string } | null;

export default function PortfolioPage() {
  const { inPortfolio, togglePortfolio } = usePortfolio();
  const [removeModal, setRemoveModal] = useState<PortfolioModal>(null);

  const allStocks = useMemo(() => {
    const pnlMap = new Map(mockStockPnl.map((s) => [s.stockCode, s]));
    const merged = [
      ...mockPopularStocks.map((s) => ({
        stockCode: s.stockCode,
        stockName: s.name,
        priceKRW: s.priceKRW,
        changePercent: s.changePercent,
        isUp: s.isUp,
      })),
      ...mockStockPnl
        .filter((s) => !mockPopularStocks.some((p) => p.stockCode === s.stockCode))
        .map((s) => ({
          stockCode: s.stockCode,
          stockName: s.stockName,
          priceKRW: 0,
          changePercent: s.pnlRate,
          isUp: s.pnlRate >= 0,
        })),
    ];
    return merged
      .filter((s) => inPortfolio(s.stockCode))
      .map((s) => ({ ...s, pnl: pnlMap.get(s.stockCode) }));
  }, [inPortfolio]);

  const [selectedCode, setSelectedCode] = useState<string>(
    allStocks[0]?.stockCode ?? "",
  );

  const signals = mockAISignals[selectedCode] ?? [];

  if (allStocks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-gray-400 text-sm gap-2">
        <svg className="w-12 h-12 mb-2 text-gray-200" viewBox="0 0 24 24" fill="currentColor">
          <path d="M19 6h-2a5 5 0 00-10 0H5a2 2 0 00-2 2l1.34 9.39A2 2 0 006.32 19h11.36a2 2 0 001.98-1.61L21 8a2 2 0 00-2-2zm-7-3a3 3 0 013 3H9a3 3 0 013-3z" />
        </svg>
        <p className="font-semibold text-gray-400">담은 종목이 없습니다.</p>
        <p className="text-xs text-gray-300">AI 리포트에서 종목을 담아보세요.</p>
      </div>
    );
  }

  return (
    <>
    {removeModal && (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
        <div className="bg-white rounded-2xl shadow-xl w-80 p-6 flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-gray-400 shrink-0" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 6h-2a5 5 0 00-10 0H5a2 2 0 00-2 2l1.34 9.39A2 2 0 006.32 19h11.36a2 2 0 001.98-1.61L21 8a2 2 0 00-2-2zm-7-3a3 3 0 013 3H9a3 3 0 013-3z" />
            </svg>
            <p className="font-bold text-slate-900 text-base">자동매매 해제</p>
          </div>
          <p className="text-sm text-gray-600 leading-relaxed">
            <span className="font-semibold text-slate-900">{removeModal.stockName}</span> 종목을 포트폴리오에서 제거합니다.
            <br /><br />
            익영업일 주식 장 시작부터 자동매매가 중단됩니다.
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => setRemoveModal(null)}
              className="flex-1 py-2.5 rounded-xl border border-gray-200 text-sm font-bold text-gray-500 hover:bg-gray-50 transition-colors"
            >
              취소
            </button>
            <button
              onClick={() => {
                togglePortfolio(removeModal.stockCode);
                setRemoveModal(null);
                if (selectedCode === removeModal.stockCode) {
                  const next = allStocks.find((s) => s.stockCode !== removeModal.stockCode);
                  setSelectedCode(next?.stockCode ?? "");
                }
              }}
              className="flex-1 py-2.5 rounded-xl bg-slate-900 text-white text-sm font-bold hover:bg-slate-700 transition-colors"
            >
              확인
            </button>
          </div>
        </div>
      </div>
    )}
    <div className="flex -mx-6 min-h-[calc(100vh-72px)]">
      {/* ── 왼쪽 종목 리스트 ── */}
      <aside className="w-64 shrink-0 bg-white border-r border-gray-100 flex flex-col">
        <div className="px-5 py-4 border-b border-gray-100 sticky top-0 bg-white z-10">
          <h2 className="text-base font-bold text-slate-900">포트폴리오 종목</h2>
        </div>
        <div className="flex-1 divide-y divide-gray-50 overflow-y-auto">
          {allStocks.map((stock) => {
            const active = selectedCode === stock.stockCode;
            return (
              <div
                key={stock.stockCode}
                onClick={() => setSelectedCode(stock.stockCode)}
                className={`relative w-full flex items-center gap-3 px-5 py-4 cursor-pointer transition-colors ${
                  active ? "bg-white" : "bg-gray-50 hover:bg-gray-100"
                }`}
              >
                {active && (
                  <div className="absolute left-0 w-[3px] h-14 bg-slate-900 rounded-r" />
                )}
                <div className="w-9 h-9 shrink-0 rounded-full bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-500">
                  {stock.stockName.substring(0, 1)}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-bold text-sm text-slate-900 truncate">{stock.stockName}</p>
                  {stock.priceKRW > 0 && (
                    <p className="text-xs text-gray-500">
                      {stock.priceKRW.toLocaleString("ko-KR")}원
                    </p>
                  )}
                </div>
                <div className="flex flex-col items-end gap-1 shrink-0">
                  <p className={`text-xs font-bold ${stock.isUp ? "text-red-500" : "text-blue-500"}`}>
                    {stock.isUp ? "+" : ""}{stock.changePercent.toFixed(2)}%
                  </p>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setRemoveModal({ stockName: stock.stockName, stockCode: stock.stockCode });
                    }}
                    className="hover:scale-110 transition-transform"
                    title="포트폴리오에서 제거"
                  >
                    <svg className="w-3.5 h-3.5 text-yellow-400" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19 6h-2a5 5 0 00-10 0H5a2 2 0 00-2 2l1.34 9.39A2 2 0 006.32 19h11.36a2 2 0 001.98-1.61L21 8a2 2 0 00-2-2zm-7-3a3 3 0 013 3H9a3 3 0 013-3z" />
                    </svg>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </aside>

      {/* ── 오른쪽 AI 시그널 ── */}
      <main className="flex-1 min-w-0 px-8 py-6 overflow-y-auto">
        <h2 className="text-lg font-bold text-slate-900 mb-5">실시간 AI 자동 거래</h2>
        {signals.length === 0 ? (
          <p className="text-sm text-gray-400 text-center py-16">
            이 종목의 AI 시그널 데이터가 없습니다.
          </p>
        ) : (
          <div className="flex flex-col gap-4">
            {signals.map((card, i) => (
              <SignalCardItem key={card.id} card={card} defaultOpen={i === 0} />
            ))}
          </div>
        )}
      </main>
    </div>
    </>
  );
}
