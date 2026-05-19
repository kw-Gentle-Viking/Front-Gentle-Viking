"use client";

const monthlyReturns = [
  { month: "1월", value: 42000 },
  { month: "2월", value: -18000 },
  { month: "3월", value: 57000 },
  { month: "4월", value: 31000 },
  { month: "5월", value: 2977 },
];

const factors = [
  { label: "배당 수익", value: "+2,977원", tone: "text-emerald-500" },
  { label: "실현 손익", value: "0원", tone: "text-slate-500" },
  { label: "평가 손익", value: "-22,028원", tone: "text-blue-500" },
];

function fmt(value: number) {
  return value.toLocaleString("ko-KR");
}

export default function ProfitAnalysis() {
  const max = Math.max(...monthlyReturns.map((item) => Math.abs(item.value)));
  const total = monthlyReturns.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="space-y-5">
      <div className="grid gap-4 md:grid-cols-3">
        <section className="rounded-2xl bg-slate-950 p-5 text-white md:col-span-1">
          <p className="text-sm font-bold text-slate-300">누적 수익</p>
          <p className={`mt-3 text-3xl font-black ${total >= 0 ? "text-rose-300" : "text-blue-300"}`}>
            {total >= 0 ? "+" : ""}
            {fmt(total)}원
          </p>
          <p className="mt-2 text-xs font-bold text-slate-400">최근 5개월 기준</p>
        </section>

        <section className="rounded-2xl border border-slate-100 bg-white p-5 shadow-[0_12px_32px_rgba(15,23,42,0.04)] md:col-span-2">
          <h2 className="text-lg font-black text-slate-950">수익 구성</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            {factors.map((factor) => (
              <div key={factor.label} className="rounded-xl bg-slate-50 p-4">
                <p className="text-xs font-bold text-slate-400">{factor.label}</p>
                <p className={`mt-2 font-black ${factor.tone}`}>{factor.value}</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      <section className="rounded-2xl border border-slate-100 bg-white p-5 shadow-[0_12px_32px_rgba(15,23,42,0.04)]">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h2 className="text-xl font-black text-slate-950">월별 수익 흐름</h2>
            <p className="mt-1 text-sm font-medium text-slate-400">막대가 0선을 기준으로 위아래로 표시됩니다.</p>
          </div>
        </div>

        <div className="mt-6 space-y-4">
          {monthlyReturns.map((item) => {
            const width = `${Math.max(8, (Math.abs(item.value) / max) * 100)}%`;
            const isPos = item.value >= 0;

            return (
              <div key={item.month} className="grid grid-cols-[44px_1fr_96px] items-center gap-3">
                <span className="text-sm font-black text-slate-500">{item.month}</span>
                <div className="h-3 rounded-full bg-slate-100">
                  <div
                    className={`h-3 rounded-full ${isPos ? "bg-rose-400" : "bg-blue-400"}`}
                    style={{ width }}
                  />
                </div>
                <span className={`text-right text-sm font-black ${isPos ? "text-rose-500" : "text-blue-500"}`}>
                  {isPos ? "+" : ""}
                  {fmt(item.value)}원
                </span>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
