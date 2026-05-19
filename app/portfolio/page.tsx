"use client";

import { FiArrowUpRight, FiPlus } from "react-icons/fi";

const holdings = [
  { name: "삼성전자", code: "005930", shares: "12주", price: "81,200원", value: "974,400원", pnl: "+5.8%", up: true },
  { name: "SK하이닉스", code: "000660", shares: "3주", price: "163,000원", value: "489,000원", pnl: "-1.2%", up: false },
  { name: "NAVER", code: "035420", shares: "2주", price: "186,700원", value: "373,400원", pnl: "+2.1%", up: true },
  { name: "카카오", code: "035720", shares: "5주", price: "55,400원", value: "277,000원", pnl: "+1.4%", up: true },
];

export default function PortfolioPage() {
  return (
    <div className="grid gap-6 xl:grid-cols-[1fr_320px]">
      <section className="rounded-2xl bg-white p-6 shadow-[0_24px_80px_rgba(15,23,42,0.06)] lg:p-8">
        <div className="flex flex-wrap items-start justify-between gap-5">
          <div><p className="text-sm font-bold text-slate-400">My Portfolio</p><h1 className="mt-2 text-4xl font-black text-slate-950">내 주식보기</h1></div>
          <button className="flex h-11 items-center gap-2 rounded-xl bg-[#5267ff] px-4 text-sm font-black text-white"><FiPlus /> 종목 추가</button>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <div className="rounded-xl bg-[#f4f7ff] p-5"><p className="text-sm font-bold text-slate-500">평가 금액</p><p className="mt-2 text-3xl font-black">2,113,800원</p></div>
          <div className="rounded-xl bg-emerald-50 p-5"><p className="text-sm font-bold text-slate-500">평가 손익</p><p className="mt-2 text-3xl font-black text-emerald-500">+63,200원</p></div>
          <div className="rounded-xl bg-rose-50 p-5"><p className="text-sm font-bold text-slate-500">오늘 변동</p><p className="mt-2 text-3xl font-black text-rose-500">+1.21%</p></div>
        </div>

        <div className="mt-8 overflow-hidden rounded-xl border border-slate-100">
          <div className="grid grid-cols-[1.4fr_0.8fr_0.9fr_0.9fr_0.7fr] bg-slate-50 px-5 py-3 text-xs font-bold text-slate-400">
            <span>종목</span><span>보유</span><span>현재가</span><span>평가금액</span><span className="text-right">수익률</span>
          </div>
          {holdings.map((stock) => (
            <div key={stock.code} className="grid grid-cols-[1.4fr_0.8fr_0.9fr_0.9fr_0.7fr] items-center border-t border-slate-100 px-5 py-4 text-sm">
              <div className="flex items-center gap-3"><span className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 font-black">{stock.name.slice(0, 1)}</span><div><p className="font-black text-slate-950">{stock.name}</p><p className="text-xs text-slate-400">{stock.code}</p></div></div>
              <span className="font-semibold text-slate-500">{stock.shares}</span><span className="font-bold">{stock.price}</span><span className="font-bold">{stock.value}</span><span className={`text-right font-black ${stock.up ? 'text-rose-500' : 'text-blue-500'}`}>{stock.pnl}</span>
            </div>
          ))}
        </div>
      </section>

      <aside className="space-y-5">
        <section className="rounded-2xl bg-white p-6 shadow-[0_24px_80px_rgba(15,23,42,0.06)]">
          <h2 className="font-black">비중</h2>
          <div className="mt-5 space-y-4">
            {['반도체 48%', '플랫폼 31%', '현금 21%'].map((item) => <div key={item}><div className="mb-2 flex justify-between text-sm font-bold"><span>{item.split(' ')[0]}</span><span>{item.split(' ')[1]}</span></div><div className="h-2 rounded-full bg-slate-100"><div className="h-2 rounded-full bg-[#5267ff]" style={{ width: item.split(' ')[1] }} /></div></div>)}
          </div>
        </section>
        <section className="rounded-2xl bg-slate-950 p-6 text-white"><p className="text-xl font-black">AI 추천</p><p className="mt-3 text-sm leading-6 text-slate-300">반도체 비중이 높습니다. 신규 매수는 플랫폼/현금 쪽으로 분산하는 편이 안정적입니다.</p><button className="mt-5 flex items-center gap-2 text-sm font-black text-emerald-300">자세히 보기 <FiArrowUpRight /></button></section>
      </aside>
    </div>
  );
}
