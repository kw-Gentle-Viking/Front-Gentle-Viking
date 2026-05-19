"use client";

import { useState } from "react";
import { mockMonthly, mockStockPnl, mockDividends } from "@/lib/mypage/mock";

type ViewTab = "전체" | "월별";

const totalSale     = mockMonthly.reduce((s, m) => s + m.saleKRW, 0);
const totalDividend = mockMonthly.reduce((s, m) => s + m.dividendKRW, 0);
const totalInterest = mockMonthly.reduce((s, m) => s + m.interestKRW, 0);
const grandTotal    = totalSale + totalDividend + totalInterest;

function fmt(v: number) {
  return v.toLocaleString("ko-KR");
}

function PnlSpan({ value, className = "" }: { value: number; className?: string }) {
  const isPos = value > 0;
  const color = value === 0 ? "text-gray-400" : isPos ? "text-red-500" : "text-blue-500";
  return (
    <span className={`${color} ${className}`}>
      {isPos ? "+" : ""}{fmt(value)}원
    </span>
  );
}

/* ── 전체 수익분석 ── */
function OverallView() {
  const sorted = [...mockStockPnl].sort((a, b) => b.pnlKRW - a.pnlKRW);
  const absTotal = mockStockPnl.reduce((acc, x) => acc + Math.abs(x.pnlKRW), 0);

  return (
    <div className="space-y-5">
      {/* 요약 카드 */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          { label: "판매수익", value: totalSale },
          { label: "배당금",   value: totalDividend },
          { label: "이자",     value: totalInterest },
          { label: "총 수익",  value: grandTotal },
        ].map(({ label, value }) => {
          const isTotal = label === "총 수익";
          const color = value > 0 ? "text-red-500" : value < 0 ? "text-blue-500" : "text-gray-400";
          return (
            <div
              key={label}
              className={`rounded-2xl border p-4 shadow-[0_2px_10px_rgba(0,0,0,0.02)] ${
                isTotal ? "border-slate-900 bg-slate-900" : "border-gray-100 bg-white"
              }`}
            >
              <p className={`text-xs font-medium ${isTotal ? "text-slate-400" : "text-gray-500"}`}>{label}</p>
              <p className={`mt-1.5 text-lg font-bold ${isTotal ? (value >= 0 ? "text-red-400" : "text-blue-400") : color}`}>
                {value > 0 ? "+" : ""}{fmt(value)}원
              </p>
            </div>
          );
        })}
      </div>

      {/* 종목별 손익 */}
      <div>
        <h3 className="mb-3 text-sm font-bold text-slate-900">종목별 손익</h3>
        <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/50 text-xs text-gray-500">
                <th className="px-5 py-3 text-left font-medium">종목</th>
                <th className="px-5 py-3 text-right font-medium">손익</th>
                <th className="px-5 py-3 text-right font-medium">수익률</th>
                <th className="px-5 py-3 pr-5 text-right font-medium">비중</th>
              </tr>
            </thead>
            <tbody>
              {sorted.map((s) => {
                const isPos = s.pnlKRW >= 0;
                const share = absTotal === 0 ? 0 : (Math.abs(s.pnlKRW) / absTotal) * 100;
                return (
                  <tr key={s.stockCode} className="border-b border-gray-50 transition-colors hover:bg-gray-50 last:border-none">
                    <td className="px-5 py-4">
                      <p className="font-bold text-slate-900">{s.stockName}</p>
                      <p className="text-xs text-gray-400">{s.stockCode}</p>
                    </td>
                    <td className="px-5 py-4 text-right">
                      <PnlSpan value={s.pnlKRW} className="font-semibold" />
                    </td>
                    <td className={`px-5 py-4 text-right font-semibold ${isPos ? "text-red-500" : "text-blue-500"}`}>
                      {isPos ? "+" : ""}{s.pnlRate.toFixed(2)}%
                    </td>
                    <td className="px-5 py-4 pr-5">
                      <div className="flex items-center justify-end gap-2">
                        <div className="h-1.5 w-20 overflow-hidden rounded-full bg-gray-100">
                          <div
                            className={`h-full rounded-full ${isPos ? "bg-red-400" : "bg-blue-400"}`}
                            style={{ width: `${share}%` }}
                          />
                        </div>
                        <span className="w-8 text-right text-xs text-gray-400">{share.toFixed(0)}%</span>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* 배당금 수익 */}
      <div>
        <h3 className="mb-3 text-sm font-bold text-slate-900">배당금 수익</h3>
        <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/50 text-xs text-gray-500">
                <th className="px-5 py-3 text-left font-medium">종목</th>
                <th className="px-5 py-3 text-left font-medium">지급일</th>
                <th className="px-5 py-3 text-right font-medium">배당금</th>
              </tr>
            </thead>
            <tbody>
              {mockDividends.map((d) => (
                <tr key={`${d.stockCode}-${d.paidAt}`} className="border-b border-gray-50 transition-colors hover:bg-gray-50 last:border-none">
                  <td className="px-5 py-4">
                    <p className="font-bold text-slate-900">{d.stockName}</p>
                    <p className="text-xs text-gray-400">{d.stockCode}</p>
                  </td>
                  <td className="px-5 py-4 text-sm text-gray-500">{d.paidAt}</td>
                  <td className="px-5 py-4 text-right font-semibold text-red-500">
                    +{fmt(d.amountKRW)}원
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="border-t-2 border-gray-100 bg-gray-50/50">
                <td colSpan={2} className="px-5 py-3 text-sm font-bold text-slate-700">합계</td>
                <td className="px-5 py-3 text-right font-bold text-red-500">
                  +{fmt(mockDividends.reduce((s, d) => s + d.amountKRW, 0))}원
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
}

/* ── 월별 수익분석 ── */
function MonthlyView() {
  const maxAbs = Math.max(...mockMonthly.map((m) => Math.abs(m.saleKRW + m.dividendKRW + m.interestKRW)), 1);

  return (
    <div className="space-y-5">
      {/* 바 차트 */}
      <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
        <p className="mb-5 text-xs font-medium text-gray-500">월별 총 수익</p>
        <div className="flex h-36 items-end justify-around gap-2">
          {mockMonthly.map((m) => {
            const total = m.saleKRW + m.dividendKRW + m.interestKRW;
            const isPos = total >= 0;
            const heightPct = (Math.abs(total) / maxAbs) * 100;
            return (
              <div key={m.month} className="flex flex-1 flex-col items-center gap-1">
                <span className={`text-[10px] font-semibold ${isPos ? "text-red-500" : "text-blue-500"}`}>
                  {total !== 0 ? `${isPos ? "+" : ""}${fmt(total)}` : ""}
                </span>
                <div className="flex w-full justify-center">
                  <div
                    className={`w-8 rounded-t transition-all ${
                      total === 0 ? "bg-gray-100" : isPos ? "bg-red-400" : "bg-blue-400"
                    }`}
                    style={{ height: total === 0 ? "4px" : `${Math.max(heightPct, 8)}%` }}
                  />
                </div>
                <span className="text-[10px] text-gray-400">{m.month.slice(5)}월</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* 월별 상세 테이블 */}
      <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50/50 text-xs text-gray-500">
              <th className="px-5 py-3 text-left font-medium">월</th>
              <th className="px-5 py-3 text-right font-medium">판매수익</th>
              <th className="px-5 py-3 text-right font-medium">배당금</th>
              <th className="px-5 py-3 text-right font-medium">이자</th>
              <th className="px-5 py-3 text-right font-medium">합계</th>
            </tr>
          </thead>
          <tbody>
            {[...mockMonthly].reverse().map((m) => {
              const total = m.saleKRW + m.dividendKRW + m.interestKRW;
              return (
                <tr key={m.month} className="border-b border-gray-50 transition-colors hover:bg-gray-50 last:border-none">
                  <td className="px-5 py-4 font-bold text-slate-900">{m.month.replace("-", "년 ")}월</td>
                  <td className="px-5 py-4 text-right"><PnlSpan value={m.saleKRW} /></td>
                  <td className="px-5 py-4 text-right"><PnlSpan value={m.dividendKRW} /></td>
                  <td className="px-5 py-4 text-right"><PnlSpan value={m.interestKRW} /></td>
                  <td className="px-5 py-4 text-right"><PnlSpan value={total} className="font-semibold" /></td>
                </tr>
              );
            })}
          </tbody>
          <tfoot>
            <tr className="border-t-2 border-gray-100 bg-gray-50/50">
              <td className="px-5 py-3 font-bold text-slate-700">합계</td>
              <td className="px-5 py-3 text-right"><PnlSpan value={totalSale} /></td>
              <td className="px-5 py-3 text-right"><PnlSpan value={totalDividend} /></td>
              <td className="px-5 py-3 text-right"><PnlSpan value={totalInterest} /></td>
              <td className="px-5 py-3 text-right"><PnlSpan value={grandTotal} className="font-bold" /></td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}

/* ── 메인 컴포넌트 ── */
export default function ProfitAnalysis() {
  const [tab, setTab] = useState<ViewTab>("전체");

  return (
    <div className="space-y-5">
      {/* 탭 헤더 */}
      <div className="flex items-end justify-between border-b border-gray-100">
        <h2 className="pb-3 text-xl font-bold text-slate-900">수익분석</h2>
        <div className="flex gap-5">
          {(["전체", "월별"] as ViewTab[]).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`relative pb-3 text-sm font-bold transition-colors ${
                tab === t ? "text-black" : "text-gray-400 hover:text-gray-600"
              }`}
            >
              {t}
              {tab === t && <span className="absolute bottom-0 left-0 h-0.5 w-full bg-black" />}
            </button>
          ))}
        </div>
      </div>

      {tab === "전체" ? <OverallView /> : <MonthlyView />}
    </div>
  );
}
