"use client";

type StockHolding = {
  flag: string;
  label: string;
  valueKRW: number;
  pnlKRW: number;
  pnlRate: number;
};

type MonthlyReturn = {
  totalKRW: number;
  saleKRW: number;
  dividendKRW: number;
  interestKRW: number;
};

type AccountAssets = {
  broker: string;
  accountNo: string;
  totalKRW: number;
  orderableKRW: number;
  cashKRW: number;
  investedKRW: number;
  investedPnlKRW: number;
  investedPnlRate: number;
  holdings: StockHolding[];
  monthly: MonthlyReturn;
};

const mockAccountAssets: AccountAssets = {
  broker: "한국투자증권",
  accountNo: "001-012-123123",
  totalKRW: 1397380,
  orderableKRW: 86539,
  cashKRW: 38,
  investedKRW: 1310797,
  investedPnlKRW: -22028,
  investedPnlRate: -1.65,
  holdings: [
    {
      flag: "🇰🇷",
      label: "국내주식",
      valueKRW: 30700,
      pnlKRW: -400,
      pnlRate: -1.28,
    },
  ],
  monthly: {
    totalKRW: 2977,
    saleKRW: 0,
    dividendKRW: 2977,
    interestKRW: 0,
  },
};

function fmt(v: number) {
  return v.toLocaleString("ko-KR");
}

function PnlText({ value, rate }: { value: number; rate: number }) {
  const isPos = value >= 0;
  const color = isPos ? "text-rose-500" : "text-blue-500";
  const sign = isPos ? "+" : "";
  return (
    <span className={`text-xs ${color}`}>
      {sign}
      {fmt(value)}원 ({sign}
      {rate.toFixed(2)}%)
    </span>
  );
}

export default function Assets() {
  const a = mockAccountAssets;
  const monthlyIsPos = a.monthly.totalKRW >= 0;
  const currentMonth = new Date().getMonth() + 1;

  return (
    <div className="space-y-6">
      {/* 계좌 헤더 */}
      <div>
        <p className="text-xs text-slate-400">
          {a.broker} 계좌{" "}
          <span className="text-blue-500">{a.accountNo}</span>
        </p>
        <div className="mt-1 flex items-center justify-between">
          <span className="text-2xl font-bold text-slate-900">
            {fmt(a.totalKRW)}원
          </span>
          <div className="flex gap-2">
            <button className="rounded-md border border-slate-200 px-4 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-50">
              채우기
            </button>
            <button className="rounded-md border border-slate-200 px-4 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-50">
              보내기
            </button>
          </div>
        </div>
      </div>

      {/* 자산 상세 */}
      <div className="space-y-0 divide-y divide-slate-100 rounded-xl border border-slate-200 bg-white">
        {/* 총 주문 가능 금액 */}
        <div className="flex items-center justify-between px-5 py-3.5">
          <span className="text-sm text-slate-600">총 주문 가능 금액</span>
          <span className="text-sm font-medium text-slate-900">
            {fmt(a.orderableKRW)}원
          </span>
        </div>

        {/* 원화 */}
        <div className="flex items-center justify-between px-5 py-3.5 pl-10">
          <span className="flex items-center gap-1.5 text-sm text-slate-500">
            <span className="flex h-4 w-4 items-center justify-center rounded-full bg-blue-500 text-[9px] font-bold text-white">
              ₩
            </span>
            원화
          </span>
          <span className="text-sm text-slate-700">{fmt(a.cashKRW)}원</span>
        </div>

        {/* 총 투자 금액 */}
        <div className="flex items-center justify-between px-5 py-3.5">
          <div>
            <p className="text-sm text-slate-600">총 투자 금액</p>
            <p className="text-xs text-slate-400">순간 종목 제외</p>
          </div>
          <div className="text-right">
            <p className="text-sm font-medium text-slate-900">
              {fmt(a.investedKRW)}원
            </p>
            <PnlText value={a.investedPnlKRW} rate={a.investedPnlRate} />
          </div>
        </div>

        {/* 종목별 보유 */}
        {a.holdings.map((h) => (
          <div
            key={h.label}
            className="flex items-center justify-between px-5 py-3.5 pl-10"
          >
            <span className="flex items-center gap-1.5 text-sm text-slate-500">
              <span>{h.flag}</span>
              {h.label}
            </span>
            <div className="text-right">
              <p className="text-sm text-slate-700">{fmt(h.valueKRW)}원</p>
              <PnlText value={h.pnlKRW} rate={h.pnlRate} />
            </div>
          </div>
        ))}
      </div>

      {/* 월별 수익 */}
      <div className="space-y-0 divide-y divide-slate-100 rounded-xl border border-slate-200 bg-white">
        {/* 월 수익 헤더 */}
        <div className="flex items-center justify-between px-5 py-3.5">
          <span className="text-sm text-slate-600">{currentMonth}월 수익</span>
          <span
            className={`text-sm font-semibold ${monthlyIsPos ? "text-rose-500" : "text-blue-500"}`}
          >
            {monthlyIsPos ? "+" : ""}
            {fmt(a.monthly.totalKRW)}원
          </span>
        </div>

        <div className="flex items-center justify-between px-5 py-3.5">
          <span className="text-sm text-slate-600">판매수익</span>
          <span className="text-sm text-slate-700">
            {fmt(a.monthly.saleKRW)}원
          </span>
        </div>

        <div className="flex items-center justify-between px-5 py-3.5">
          <span className="text-sm text-slate-600">배당금</span>
          <span className="text-sm text-slate-700">
            {a.monthly.dividendKRW > 0 ? "+" : ""}
            {fmt(a.monthly.dividendKRW)}원
          </span>
        </div>

        <div className="flex items-center justify-between px-5 py-3.5">
          <span className="text-sm text-slate-600">이자</span>
          <span className="text-sm text-slate-700">
            {fmt(a.monthly.interestKRW)}원
          </span>
        </div>
      </div>
    </div>
  );
}
