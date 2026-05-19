"use client";

import { useState } from "react";

type AITradeAction = "매수" | "매도";

type AITrade = {
  id: string;
  datetime: string;
  stockName: string;
  stockCode: string;
  action: AITradeAction;
  qty: number;
  price: number;
  reason: string;
  pnlKRW?: number;
  pnlRate?: number;
};

const mockAITrades: AITrade[] = [
  { id: "ai1", datetime: "2026-05-19 09:05", stockName: "삼성전자",      stockCode: "005930", action: "매수", qty: 2, price: 73500,  reason: "RSI 과매도 + 거래량 급증 감지" },
  { id: "ai2", datetime: "2026-05-19 10:20", stockName: "SK하이닉스",    stockCode: "000660", action: "매도", qty: 1, price: 143200, reason: "목표 수익률 도달 (5%), 리스크 관리",         pnlKRW: 6800,  pnlRate: 5.0 },
  { id: "ai3", datetime: "2026-05-18 11:40", stockName: "네이버",        stockCode: "035420", action: "매수", qty: 1, price: 56500,  reason: "AI 시그널: 단기 추세 상향 돌파" },
  { id: "ai4", datetime: "2026-05-17 14:03", stockName: "카카오",        stockCode: "035720", action: "매도", qty: 2, price: 40200,  reason: "손절 기준 -3% 도달, 추가 하락 위험",        pnlKRW: -2400, pnlRate: -2.9 },
  { id: "ai5", datetime: "2026-05-16 09:31", stockName: "현대차",        stockCode: "005380", action: "매수", qty: 1, price: 212000, reason: "뉴스 센티멘트 긍정 + MACD 골든크로스" },
  { id: "ai6", datetime: "2026-05-15 13:55", stockName: "삼성전자",      stockCode: "005930", action: "매도", qty: 2, price: 74900,  reason: "목표 수익률 도달 (1.9%), 변동성 상승 감지", pnlKRW: 2800,  pnlRate: 1.9 },
  { id: "ai7", datetime: "2026-05-14 10:12", stockName: "LG에너지솔루션", stockCode: "373220", action: "매수", qty: 1, price: 375000, reason: "섹터 모멘텀 상승, 기관 순매수 포착" },
];

const ACTION_STYLE: Record<AITradeAction, string> = {
  매수: "text-red-500",
  매도: "text-blue-500",
};

const FILTER_OPTIONS: (AITradeAction | "전체")[] = ["전체", "매수", "매도"];

function fmt(v: number) {
  return v.toLocaleString("ko-KR");
}

export default function AITradeHistory() {
  const [filter, setFilter] = useState<AITradeAction | "전체">("전체");

  const filtered = filter === "전체" ? mockAITrades : mockAITrades.filter((t) => t.action === filter);

  return (
    <div className="space-y-5">
      {/* 헤더 + 탭 필터 */}
      <div className="flex items-end justify-between border-b border-gray-100">
        <div className="pb-3">
          <h2 className="text-xl font-bold text-slate-900">거래내역</h2>
          <p className="mt-0.5 text-xs text-gray-400">AI 자동매매 체결 건만 표시됩니다.</p>
        </div>
        <div className="flex items-end gap-5">
          {FILTER_OPTIONS.map((opt) => (
            <button
              key={opt}
              onClick={() => setFilter(opt)}
              className={`relative pb-3 text-sm font-bold transition-colors ${
                filter === opt ? "text-black" : "text-gray-400 hover:text-gray-600"
              }`}
            >
              {opt}
              {filter === opt && (
                <span className="absolute bottom-0 left-0 h-0.5 w-full bg-black" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* 테이블 */}
      <div className="overflow-x-auto rounded-2xl border border-gray-100 bg-white shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50/50 text-xs text-gray-500">
              <th className="px-5 py-3 text-left font-medium">거래일시</th>
              <th className="px-5 py-3 text-left font-medium">종목</th>
              <th className="px-5 py-3 text-center font-medium">구분</th>
              <th className="px-5 py-3 text-right font-medium">수량</th>
              <th className="px-5 py-3 text-right font-medium">체결가</th>
              <th className="px-5 py-3 text-right font-medium">총 금액</th>
              <th className="px-5 py-3 text-right font-medium">손익</th>
              <th className="px-5 py-3 text-left font-medium">AI 매매 사유</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={8} className="py-16 text-center text-sm text-gray-400">
                  거래내역이 없습니다.
                </td>
              </tr>
            ) : (
              filtered.map((trade) => {
                const total = trade.price * trade.qty;
                const isPos = (trade.pnlKRW ?? 0) >= 0;
                return (
                  <tr key={trade.id} className="border-b border-gray-50 transition-colors hover:bg-gray-50 last:border-none">
                    <td className="whitespace-nowrap px-5 py-4 text-xs text-gray-400">{trade.datetime}</td>
                    <td className="px-5 py-4">
                      <p className="font-bold text-slate-900">{trade.stockName}</p>
                      <p className="text-xs text-gray-400">{trade.stockCode}</p>
                    </td>
                    <td className="px-5 py-4 text-center">
                      <span className={`font-bold ${ACTION_STYLE[trade.action]}`}>{trade.action}</span>
                    </td>
                    <td className="px-5 py-4 text-right text-slate-700">{fmt(trade.qty)}주</td>
                    <td className="px-5 py-4 text-right text-slate-700">{fmt(trade.price)}원</td>
                    <td className="px-5 py-4 text-right text-slate-700">{fmt(total)}원</td>
                    <td className="px-5 py-4 text-right">
                      {trade.pnlKRW !== undefined ? (
                        <span className={`font-semibold ${isPos ? "text-red-500" : "text-blue-500"}`}>
                          {isPos ? "+" : ""}{fmt(trade.pnlKRW)}원
                          <br />
                          <span className="text-xs font-normal">
                            ({isPos ? "+" : ""}{trade.pnlRate?.toFixed(1)}%)
                          </span>
                        </span>
                      ) : (
                        <span className="text-gray-300">-</span>
                      )}
                    </td>
                    <td className="px-5 py-4">
                      <span className="flex items-start gap-1.5">
                        <span className="mt-0.5 shrink-0 rounded bg-violet-100 px-1 text-[10px] font-bold text-violet-500">AI</span>
                        <span className="text-xs text-gray-600">{trade.reason}</span>
                      </span>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      <p className="text-right text-xs text-gray-400">총 {filtered.length}건</p>
    </div>
  );
}
