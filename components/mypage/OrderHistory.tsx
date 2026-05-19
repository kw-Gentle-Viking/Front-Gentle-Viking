"use client";

import { useState } from "react";

type OrderStatus = "체결" | "취소" | "미체결";
type OrderType = "매수" | "매도";

type Order = {
  id: string;
  datetime: string;
  stockName: string;
  stockCode: string;
  type: OrderType;
  orderQty: number;
  orderPrice: number;
  filledQty: number;
  filledPrice: number;
  status: OrderStatus;
};

const mockOrders: Order[] = [
  { id: "o1", datetime: "2026-05-19 09:05", stockName: "삼성전자",      stockCode: "005930", type: "매수", orderQty: 10, orderPrice: 74000,  filledQty: 10, filledPrice: 73800,  status: "체결" },
  { id: "o2", datetime: "2026-05-19 09:32", stockName: "SK하이닉스",    stockCode: "000660", type: "매도", orderQty: 5,  orderPrice: 143000, filledQty: 5,  filledPrice: 143200, status: "체결" },
  { id: "o3", datetime: "2026-05-18 14:11", stockName: "카카오",        stockCode: "035720", type: "매수", orderQty: 3,  orderPrice: 41000,  filledQty: 0,  filledPrice: 0,      status: "취소" },
  { id: "o4", datetime: "2026-05-18 10:47", stockName: "네이버",        stockCode: "035420", type: "매수", orderQty: 2,  orderPrice: 57000,  filledQty: 2,  filledPrice: 56900,  status: "체결" },
  { id: "o5", datetime: "2026-05-17 11:20", stockName: "현대차",        stockCode: "005380", type: "매도", orderQty: 4,  orderPrice: 215000, filledQty: 4,  filledPrice: 215500, status: "체결" },
  { id: "o6", datetime: "2026-05-16 09:58", stockName: "LG에너지솔루션", stockCode: "373220", type: "매수", orderQty: 1,  orderPrice: 380000, filledQty: 0,  filledPrice: 0,      status: "미체결" },
  { id: "o7", datetime: "2026-05-15 15:03", stockName: "삼성전자",      stockCode: "005930", type: "매도", orderQty: 5,  orderPrice: 75000,  filledQty: 5,  filledPrice: 74900,  status: "체결" },
];

const STATUS_STYLE: Record<OrderStatus, string> = {
  체결:   "bg-emerald-50 text-emerald-600",
  취소:   "bg-gray-100 text-gray-400",
  미체결: "bg-amber-50 text-amber-500",
};

const TYPE_STYLE: Record<OrderType, string> = {
  매수: "text-red-500",
  매도: "text-blue-500",
};

const FILTER_OPTIONS: (OrderStatus | "전체")[] = ["전체", "체결", "미체결", "취소"];

function fmt(v: number) {
  return v.toLocaleString("ko-KR");
}

export default function OrderHistory() {
  const [filter, setFilter] = useState<OrderStatus | "전체">("전체");

  const filtered = filter === "전체" ? mockOrders : mockOrders.filter((o) => o.status === filter);

  return (
    <div className="space-y-5">
      {/* 헤더 + 탭 필터 */}
      <div className="flex items-end justify-between border-b border-gray-100">
        <h2 className="text-xl font-bold text-slate-900 pb-3">주문내역</h2>
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
              <th className="px-5 py-3 text-left font-medium">주문일시</th>
              <th className="px-5 py-3 text-left font-medium">종목</th>
              <th className="px-5 py-3 text-center font-medium">구분</th>
              <th className="px-5 py-3 text-right font-medium">주문수량</th>
              <th className="px-5 py-3 text-right font-medium">주문단가</th>
              <th className="px-5 py-3 text-right font-medium">체결수량</th>
              <th className="px-5 py-3 text-right font-medium">체결단가</th>
              <th className="px-5 py-3 text-center font-medium">상태</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={8} className="py-16 text-center text-sm text-gray-400">
                  주문내역이 없습니다.
                </td>
              </tr>
            ) : (
              filtered.map((order) => (
                <tr key={order.id} className="border-b border-gray-50 transition-colors hover:bg-gray-50 last:border-none">
                  <td className="whitespace-nowrap px-5 py-4 text-xs text-gray-400">
                    {order.datetime}
                  </td>
                  <td className="px-5 py-4">
                    <p className="font-bold text-slate-900">{order.stockName}</p>
                    <p className="text-xs text-gray-400">{order.stockCode}</p>
                  </td>
                  <td className="px-5 py-4 text-center">
                    <span className={`font-bold ${TYPE_STYLE[order.type]}`}>{order.type}</span>
                  </td>
                  <td className="px-5 py-4 text-right text-slate-700">{fmt(order.orderQty)}주</td>
                  <td className="px-5 py-4 text-right text-slate-700">{fmt(order.orderPrice)}원</td>
                  <td className="px-5 py-4 text-right text-slate-700">
                    {order.filledQty > 0 ? `${fmt(order.filledQty)}주` : "-"}
                  </td>
                  <td className="px-5 py-4 text-right text-slate-700">
                    {order.filledPrice > 0 ? `${fmt(order.filledPrice)}원` : "-"}
                  </td>
                  <td className="px-5 py-4 text-center">
                    <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${STATUS_STYLE[order.status]}`}>
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <p className="text-right text-xs text-gray-400">총 {filtered.length}건</p>
    </div>
  );
}
