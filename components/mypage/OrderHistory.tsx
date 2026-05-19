"use client";

type OrderStatus = "체결" | "대기" | "취소";
type OrderSide = "매수" | "매도";

type Order = {
  id: string;
  requestedAt: string;
  stockName: string;
  stockCode: string;
  side: OrderSide;
  status: OrderStatus;
  qty: number;
  price: number;
};

const orders: Order[] = [
  {
    id: "ord-001",
    requestedAt: "2026-05-19 09:01",
    stockName: "삼성전자",
    stockCode: "005930",
    side: "매수",
    status: "체결",
    qty: 2,
    price: 73500,
  },
  {
    id: "ord-002",
    requestedAt: "2026-05-19 10:12",
    stockName: "SK하이닉스",
    stockCode: "000660",
    side: "매도",
    status: "체결",
    qty: 1,
    price: 143200,
  },
  {
    id: "ord-003",
    requestedAt: "2026-05-18 14:40",
    stockName: "카카오",
    stockCode: "035720",
    side: "매수",
    status: "대기",
    qty: 3,
    price: 40100,
  },
  {
    id: "ord-004",
    requestedAt: "2026-05-17 11:18",
    stockName: "NAVER",
    stockCode: "035420",
    side: "매도",
    status: "취소",
    qty: 1,
    price: 56500,
  },
];

const statusStyle: Record<OrderStatus, string> = {
  체결: "bg-emerald-50 text-emerald-600",
  대기: "bg-orange-50 text-orange-500",
  취소: "bg-slate-100 text-slate-500",
};

function fmt(value: number) {
  return value.toLocaleString("ko-KR");
}

export default function OrderHistory() {
  return (
    <div className="space-y-5">
      <div className="flex justify-end">
        <span className="rounded-full bg-[#eef2ff] px-4 py-2 text-xs font-black text-[#5267ff]">
          총 {orders.length}건
        </span>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-slate-100 bg-white shadow-[0_12px_32px_rgba(15,23,42,0.04)]">
        <table className="w-full min-w-[760px] text-sm">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50/80 text-xs font-bold text-slate-400">
              <th className="px-5 py-3 text-left">주문일시</th>
              <th className="px-5 py-3 text-left">종목</th>
              <th className="px-5 py-3 text-center">구분</th>
              <th className="px-5 py-3 text-right">수량</th>
              <th className="px-5 py-3 text-right">주문가</th>
              <th className="px-5 py-3 text-right">주문금액</th>
              <th className="px-5 py-3 text-center">상태</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-b border-slate-50 last:border-none hover:bg-slate-50/70">
                <td className="whitespace-nowrap px-5 py-4 text-xs font-bold text-slate-400">
                  {order.requestedAt}
                </td>
                <td className="px-5 py-4">
                  <p className="font-black text-slate-950">{order.stockName}</p>
                  <p className="mt-0.5 text-xs font-bold text-slate-400">{order.stockCode}</p>
                </td>
                <td className={`px-5 py-4 text-center font-black ${order.side === "매수" ? "text-rose-500" : "text-blue-500"}`}>
                  {order.side}
                </td>
                <td className="px-5 py-4 text-right font-semibold text-slate-700">{fmt(order.qty)}주</td>
                <td className="px-5 py-4 text-right font-semibold text-slate-700">{fmt(order.price)}원</td>
                <td className="px-5 py-4 text-right font-black text-slate-950">
                  {fmt(order.qty * order.price)}원
                </td>
                <td className="px-5 py-4 text-center">
                  <span className={`rounded-full px-3 py-1 text-xs font-black ${statusStyle[order.status]}`}>
                    {order.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
