"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { FiBookOpen, FiClock, FiExternalLink, FiFileText, FiTrendingUp } from "react-icons/fi";
import { loadCandlesFromCsv } from "@/lib/chart/parseStockCsv";
import type { CandleType } from "@/lib/chart/types";

const marketIndices = [
  { name: "달러 환율", value: "1,345.50", change: "+0.50", percent: "+0.03%", isUp: true, color: "#f43f5e" },
  { name: "코스피", value: "2,755.62", change: "-4.84", percent: "-0.18%", isUp: false, color: "#3b82f6" },
  { name: "코스닥", value: "911.59", change: "+8.93", percent: "+0.98%", isUp: true, color: "#10b981" },
];

const todayNews = [
  { title: "반도체 대형주, 외국인 순매수 유입", source: "Market Brief", time: "09:18" },
  { title: "원달러 환율 보합권 출발, 수출주 민감도 확대", source: "FX Desk", time: "10:05" },
  { title: "2차전지 업종 거래대금 증가", source: "Daily Signal", time: "11:42" },
  { title: "금리 인하 기대감에 성장주 반등", source: "Morning Call", time: "12:10" },
];

const disclosures = [
  { company: "삼성전자", title: "기업설명회(IR) 개최 안내", time: "13:30" },
  { company: "NAVER", title: "주요 경영사항 공시", time: "15:00" },
  { company: "LG에너지솔루션", title: "단일판매 공급계약 정정", time: "16:10" },
  { company: "카카오", title: "임원ㆍ주요주주 특정증권 소유상황", time: "16:40" },
];

const popularStocks = [
  { rank: 1, name: "삼성전자", price: "81,200원", change: "+0.61%", isUp: true, volume: "431억원" },
  { rank: 2, name: "SK하이닉스", price: "163,000원", change: "-1.25%", isUp: false, volume: "198억원" },
  { rank: 3, name: "엔에이치스팩33호", price: "4,390원", change: "+119.50%", isUp: true, volume: "138억원" },
  { rank: 4, name: "한화솔루션", price: "35,250원", change: "-4.21%", isUp: false, volume: "70억원" },
  { rank: 5, name: "카카오", price: "55,400원", change: "+1.45%", isUp: true, volume: "67억원" },
];

const recentStocks = [
  { name: "현대차", code: "005380", price: "212,000원", change: "+0.84%" },
  { name: "NAVER", code: "035420", price: "186,700원", change: "+2.10%" },
  { name: "LG에너지솔루션", code: "373220", price: "348,500원", change: "-0.42%" },
];

const chartRanges = [
  { key: "1D", label: "1일", points: 80 },
  { key: "1W", label: "1주", points: 160 },
  { key: "1M", label: "1개월", points: 320 },
  { key: "1Y", label: "1년", points: 720 },
];

function MarketSparkline({ color, isUp }: { color: string; isUp: boolean }) {
  const path = isUp
    ? "M0 34 C20 38 28 22 46 26 C62 30 70 14 88 18 C108 22 114 10 132 12 C146 14 150 8 160 10"
    : "M0 12 C18 10 28 26 44 22 C60 18 72 34 90 30 C108 26 118 42 134 38 C148 34 152 44 160 40";

  return (
    <svg viewBox="0 0 160 54" className="h-9 w-20" aria-hidden="true">
      <path d={path} fill="none" stroke={color} strokeWidth="4" strokeLinecap="round" />
    </svg>
  );
}

function HomeAreaChart({ data, isUp }: { data: CandleType[]; isUp: boolean }) {
  const chart = useMemo(() => {
    const points = data.map((item) => item.close);
    const width = 920;
    const height = 300;
    const padX = 18;
    const padY = 22;
    const max = Math.max(...points);
    const min = Math.min(...points);
    const range = max - min || 1;
    const step = (width - padX * 2) / Math.max(points.length - 1, 1);
    const toY = (value: number) => padY + (1 - (value - min) / range) * (height - padY * 2);

    const line = points
      .map((value, index) => `${index === 0 ? "M" : "L"} ${padX + index * step} ${toY(value)}`)
      .join(" ");
    const area = `${line} L ${width - padX} ${height - padY} L ${padX} ${height - padY} Z`;

    return { width, height, line, area };
  }, [data]);

  const accent = isUp ? "#fb7185" : "#60a5fa";
  const softAccent = isUp ? "rgba(251,113,133,0.18)" : "rgba(96,165,250,0.18)";

  return (
    <div className="relative h-[316px] overflow-hidden rounded-2xl border border-slate-100 bg-[linear-gradient(180deg,#ffffff_0%,#f8fbff_100%)]">
      <div className="pointer-events-none absolute inset-x-6 top-6 h-px bg-slate-100" />
      <div className="pointer-events-none absolute inset-x-6 top-1/2 h-px bg-slate-100" />
      <div className="pointer-events-none absolute inset-x-6 bottom-6 h-px bg-slate-100" />
      <svg viewBox={`0 0 ${chart.width} ${chart.height}`} className="absolute inset-0 h-full w-full" aria-hidden="true">
        <defs>
          <linearGradient id="homeChartFill" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor={softAccent} />
            <stop offset="100%" stopColor="rgba(255,255,255,0)" />
          </linearGradient>
          <filter id="homeChartGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <path d={chart.area} fill="url(#homeChartFill)" />
        <path d={chart.line} fill="none" stroke={accent} strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" filter="url(#homeChartGlow)" />
      </svg>
    </div>
  );
}

export default function DashboardPage() {
  const [candles, setCandles] = useState<CandleType[]>([]);
  const [selectedStock, setSelectedStock] = useState(popularStocks[0]);
  const [chartRange, setChartRange] = useState(chartRanges[0]);

  useEffect(() => {
    loadCandlesFromCsv("/005930.csv")
      .then((data) => setCandles(data))
      .catch(() => setCandles([]));
  }, []);

  const selectedMeta = useMemo(
    () => ({
      name: selectedStock.name,
      price: selectedStock.price,
      change: selectedStock.change,
      isUp: selectedStock.isUp,
    }),
    [selectedStock],
  );
  const visibleCandles = useMemo(() => candles.slice(-chartRange.points), [candles, chartRange]);

  return (
    <div className="space-y-4">
      <section className="grid items-stretch gap-4 xl:grid-cols-[minmax(0,1fr)_360px]">
        <article className="rounded-2xl bg-white p-4 shadow-[0_20px_60px_rgba(15,23,42,0.06)]">
          <div className="mb-4 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 shadow-[0_0_0_4px_rgba(52,211,153,0.14)]" />
              <h2 className="text-lg font-black text-slate-950">국내 정규장</h2>
            </div>
            <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-black text-emerald-600">
              장중
            </span>
          </div>

          <div className="grid gap-3 md:grid-cols-3">
            {marketIndices.map((index) => (
              <div key={index.name} className="rounded-xl border border-slate-100 bg-slate-50/70 p-3">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="text-sm font-bold text-slate-500">{index.name}</p>
                    <p className="mt-1 text-2xl font-black text-slate-950">{index.value}</p>
                    <p className={`mt-0.5 text-sm font-black ${index.isUp ? "text-rose-500" : "text-blue-500"}`}>
                      {index.change} ({index.percent})
                    </p>
                  </div>
                  <MarketSparkline color={index.color} isUp={index.isUp} />
                </div>
              </div>
            ))}
          </div>
        </article>

        <Link
          href="/mypage?tab=assets"
          className="block rounded-2xl bg-slate-950 p-4 text-white shadow-[0_20px_60px_rgba(15,23,42,0.18)] transition hover:-translate-y-0.5 hover:bg-slate-900 hover:shadow-[0_28px_90px_rgba(15,23,42,0.24)]"
        >
          <p className="text-sm font-bold text-slate-300">내 자산</p>
          <p className="mt-2 text-2xl font-black text-white">139만 7,380원</p>
          <p className="mt-2 text-sm font-bold text-emerald-300">+2.37% 오늘</p>
          <div className="mt-4 grid grid-cols-2 gap-3">
            <div className="rounded-xl bg-white/10 p-2.5 ring-1 ring-white/10">
              <p className="text-xs text-slate-400">수익</p>
              <p className="mt-1 font-black text-white">+29,770원</p>
            </div>
            <div className="rounded-xl bg-white/10 p-2.5 ring-1 ring-white/10">
              <p className="text-xs text-slate-400">현금</p>
              <p className="mt-1 font-black text-white">86,539원</p>
            </div>
          </div>
        </Link>
      </section>

      <section className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_360px]">
        <article className="rounded-2xl bg-white p-4 shadow-[0_20px_60px_rgba(15,23,42,0.06)]">
          <div className="mb-3 flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="text-sm font-bold text-[#5267ff]">Stock Chart</p>
              <h2 className="mt-1 text-xl font-black text-slate-950">{selectedMeta.name}</h2>
            </div>
            <div className="text-right">
              <p className="text-lg font-black text-slate-950">{selectedMeta.price}</p>
              <p className={`text-sm font-black ${selectedMeta.isUp ? "text-rose-500" : "text-blue-500"}`}>
                {selectedMeta.change}
              </p>
            </div>
          </div>
          {visibleCandles.length > 0 ? (
            <HomeAreaChart data={visibleCandles} isUp={selectedMeta.isUp} />
          ) : (
            <div className="flex h-[316px] items-center justify-center rounded-2xl border border-slate-100 bg-slate-50 text-sm font-bold text-slate-400">
              차트를 불러오는 중입니다.
            </div>
          )}
          <div className="mt-3 grid grid-cols-4 rounded-2xl bg-slate-100 p-1">
            {chartRanges.map((range) => (
              <button
                key={range.key}
                type="button"
                onClick={() => setChartRange(range)}
                className={`h-10 rounded-xl text-sm font-black transition ${chartRange.key === range.key
                  ? "bg-white text-slate-950 shadow-sm"
                  : "text-slate-400 hover:text-slate-700"
                  }`}
              >
                {range.label}
              </button>
            ))}
          </div>
        </article>

        <article className="rounded-2xl bg-white p-4 shadow-[0_20px_60px_rgba(15,23,42,0.06)]">
          <div className="mb-3 flex items-center justify-between">
            <div>
              <p className="text-sm font-black text-[#5267ff]">Live Ranking</p>
              <h2 className="mt-1 text-lg font-black text-slate-950">실시간 종목 랭킹</h2>
            </div>
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#eef2ff] text-[#5267ff]">
              <FiTrendingUp className="h-4 w-4" />
            </span>
          </div>

          <div className="space-y-2">
            {popularStocks.map((stock) => {
              const isSelected = selectedStock.name === stock.name;

              return (
                <button
                  key={stock.rank}
                  type="button"
                  onClick={() => setSelectedStock(stock)}
                  className={`flex w-full items-center gap-2.5 rounded-lg border p-2.5 text-left transition ${isSelected ? "border-[#5267ff]/40 bg-[#eef2ff]" : "border-slate-100 hover:bg-slate-50"
                    }`}
                >
                  <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-xs font-black ${stock.rank <= 3 ? "bg-[#5267ff] text-white" : "bg-slate-100 text-slate-500"}`}>
                    {stock.rank}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-xs font-black text-slate-950">{stock.name}</p>
                    <p className="text-xs font-bold text-slate-400">{stock.volume}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-black text-slate-950">{stock.price}</p>
                    <p className={`text-xs font-black ${stock.isUp ? "text-rose-500" : "text-blue-500"}`}>{stock.change}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </article>
      </section>

      <section className="grid gap-4 xl:grid-cols-3">
        <article className="rounded-2xl bg-[#0f1f3d] p-4 text-white shadow-[0_20px_60px_rgba(15,31,61,0.16)]">
          <div className="mb-3 flex items-center justify-between">
            <div>
              <p className="text-sm font-black text-sky-200">Today</p>
              <h2 className="mt-1 text-base font-black text-white">오늘의 뉴스</h2>
            </div>
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 text-sky-200 ring-1 ring-white/10">
              <FiBookOpen className="h-4 w-4" />
            </span>
          </div>

          <div className="space-y-2">
            {todayNews.slice(0, 3).map((news) => (
              <div key={news.title} className="rounded-lg bg-white/10 px-2.5 py-2 ring-1 ring-white/10 transition hover:bg-white/15">
                <div className="mb-0.5 flex items-center justify-between gap-3">
                  <span className="text-xs font-black text-sky-200">뉴스</span>
                  <span className="text-xs font-bold text-slate-400">{news.time}</span>
                </div>
                <p className="text-xs font-black leading-5 text-white">{news.title}</p>
                <p className="mt-0.5 text-xs font-bold text-slate-400">{news.source}</p>
              </div>
            ))}
          </div>
        </article>

        <article className="rounded-2xl bg-amber-50 p-4 shadow-[0_20px_60px_rgba(245,158,11,0.12)]">
          <div className="mb-3 flex items-center justify-between">
            <div>
              <p className="text-sm font-black text-amber-700">Disclosure</p>
              <h2 className="mt-1 text-base font-black text-slate-950">오늘의 공시</h2>
            </div>
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-amber-700 shadow-sm">
              <FiFileText className="h-4 w-4" />
            </span>
          </div>

          <div className="space-y-2">
            {disclosures.slice(0, 3).map((item) => (
              <div key={`${item.company}-${item.title}`} className="group rounded-lg bg-white/85 px-2.5 py-2 transition hover:bg-white">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs font-black text-amber-700">{item.company}</p>
                    <p className="mt-0.5 text-xs font-black leading-5 text-slate-950">{item.title}</p>
                    <p className="mt-0.5 text-xs font-bold text-slate-400">오늘 {item.time}</p>
                  </div>
                  <FiExternalLink className="mt-0.5 h-3.5 w-3.5 shrink-0 text-amber-300 transition group-hover:text-amber-700" />
                </div>
              </div>
            ))}
          </div>
        </article>

        <article className="rounded-2xl bg-white p-4 shadow-[0_20px_60px_rgba(15,23,42,0.06)]">
          <div className="mb-3 flex items-center justify-between">
            <div>
              <p className="text-sm font-black text-slate-500">Recently Viewed</p>
              <h2 className="mt-1 text-lg font-black text-slate-950">최근에 본 종목</h2>
            </div>
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 text-slate-500">
              <FiClock className="h-4 w-4" />
            </span>
          </div>

          <div className="space-y-2">
            {recentStocks.map((stock) => (
              <div key={stock.code} className="flex items-center gap-3 rounded-lg border border-slate-100 p-2.5">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-xs font-black text-slate-500">
                  {stock.name.slice(0, 1)}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-xs font-black text-slate-950">{stock.name}</p>
                  <p className="text-xs font-bold text-slate-400">{stock.code}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs font-black text-slate-950">{stock.price}</p>
                  <p className={`text-xs font-black ${stock.change.startsWith("-") ? "text-blue-500" : "text-rose-500"}`}>
                    {stock.change}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </article>
      </section>
    </div>
  );
}
