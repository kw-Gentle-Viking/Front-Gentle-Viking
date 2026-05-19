"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  createChart,
  CrosshairMode,
  IChartApi,
  ISeriesApi,
  CandlestickData,
  UTCTimestamp,
  CandlestickSeries,
} from "lightweight-charts";
import type { CandleType } from "@/lib/chart/types";

type Period = "일간" | "주간" | "월간" | "전체";
const PERIODS: Period[] = ["일간", "주간", "월간", "전체"];

// 2026-05-19 00:00:00 UTC
const BASE_TS = 1779235200;
const DAY = 86400;

function seededRng(seed: number) {
  let s = (Math.abs(Math.floor(seed)) | 1) & 0x7fffffff;
  return () => {
    s = (s * 1664525 + 1013904223) & 0x7fffffff;
    return s / 0x7fffffff;
  };
}

const PERIOD_CONFIG: Record<
  Period,
  { count: number; vol: number; interval: number }
> = {
  일간: { count: 60, vol: 0.004, interval: 1800 },
  주간: { count: 60, vol: 0.015, interval: DAY },
  월간: { count: 60, vol: 0.012, interval: DAY },
  전체: { count: 60, vol: 0.025, interval: 7 * DAY },
};

function generateCandles(
  stockId: number,
  basePrice: number,
  period: Period,
): CandleType[] {
  const { count, vol, interval } = PERIOD_CONFIG[period];
  const rng = seededRng(stockId * 9973 + period.charCodeAt(0));

  // Walk backward from basePrice so last close === basePrice
  const closes: number[] = [basePrice];
  for (let i = 1; i < count; i++) {
    const prev = closes[closes.length - 1];
    const delta = (rng() - 0.5) * 2 * vol * prev;
    closes.push(Math.max(prev * 0.8, prev + delta));
  }
  closes.reverse();

  const startTs =
    period === "일간"
      ? BASE_TS // 9:00 KST = 00:00 UTC
      : BASE_TS - (count - 1) * interval;

  return closes.map((close, i) => {
    const rng2 = seededRng(stockId * 131 + i * 17 + period.charCodeAt(0));
    const open =
      i === 0 ? close * (1 + (rng2() - 0.5) * vol * 3) : closes[i - 1];
    const bodyHigh = Math.max(open, close);
    const bodyLow = Math.min(open, close);
    const spread = Math.max(bodyHigh - bodyLow, close * vol * 0.3);
    const wm = 0.3 + rng2() * 0.8;
    return {
      time: startTs + i * interval,
      open,
      high: Math.max(bodyHigh + rng2() * spread * wm, bodyHigh),
      low: Math.min(bodyLow - rng2() * spread * wm, bodyLow),
      close,
    };
  });
}

type Props = {
  stockId: number;
  currentPrice: number;
};

export default function StockChartPanel({ stockId, currentPrice }: Props) {
  const [period, setPeriod] = useState<Period>("월간");
  const containerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const seriesRef = useRef<ISeriesApi<"Candlestick"> | null>(null);

  const candles = useMemo(
    () => generateCandles(stockId, currentPrice, period),
    [stockId, currentPrice, period],
  );

  // 차트 초기화 및 리사이즈 핸들러 등록
  useEffect(() => {
    if (!containerRef.current) return;

    const chart = createChart(containerRef.current, {
      height: 300,
      width: containerRef.current.clientWidth,
      crosshair: { mode: CrosshairMode.Normal },
      layout: {
        background: { color: "transparent" },
        textColor: "#64748b",
      },
      grid: {
        vertLines: { visible: false },
        horzLines: { color: "#f1f5f9" },
      },
      rightPriceScale: { borderVisible: false },
      timeScale: { borderVisible: false },
    });

    const series = chart.addSeries(CandlestickSeries, {
      upColor: "#ef4444",
      downColor: "#3b82f6",
      borderUpColor: "#ef4444",
      borderDownColor: "#3b82f6",
      wickUpColor: "#ef4444",
      wickDownColor: "#3b82f6",
      priceFormat: {
        type: "custom",
        formatter: (price: number) => `${price.toLocaleString("ko-KR")}원`,
      },
    });

    chartRef.current = chart;
    seriesRef.current = series;

    const onResize = () => {
      if (!containerRef.current || !chartRef.current) return;
      chartRef.current.applyOptions({
        width: containerRef.current.clientWidth,
      });
    };
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      chart.remove();
      chartRef.current = null;
      seriesRef.current = null;
    };
  }, []);

  // 캔들 데이터 업데이트 및 타임스케일 포맷터 설정
  useEffect(() => {
    if (!seriesRef.current || !chartRef.current) return;

    const chartData: CandlestickData[] = candles.map((d) => ({
      time: d.time as UTCTimestamp,
      open: d.open,
      high: d.high,
      low: d.low,
      close: d.close,
    }));

    seriesRef.current.setData(chartData);
    chartRef.current.timeScale().fitContent();

    chartRef.current.applyOptions({
      timeScale: {
        tickMarkFormatter: (time: UTCTimestamp) => {
          const d = new Date(time * 1000);
          if (period === "일간") {
            const h = (d.getUTCHours() + 9) % 24;
            const m = d.getUTCMinutes();
            return `${h}:${m.toString().padStart(2, "0")}`;
          }
          if (period === "전체") {
            return `${d.getUTCFullYear()}.${d.getUTCMonth() + 1}`;
          }
          return `${d.getUTCMonth() + 1}/${d.getUTCDate()}`;
        },
      },
    });
  }, [candles, period]);

  return (
    <div className="pt-1 pb-1">
      <div className="flex gap-1.5 mb-3">
        {PERIODS.map((p) => (
          <button
            key={p}
            onClick={(e) => {
              e.stopPropagation();
              setPeriod(p);
            }}
            className={`px-3 py-1 text-xs font-bold rounded-lg transition-colors ${
              period === p
                ? "bg-slate-900 text-white"
                : "bg-gray-100 text-gray-500 hover:bg-gray-200"
            }`}
          >
            {p}
          </button>
        ))}
      </div>
      <div className="px-4">
        <div ref={containerRef} className="w-full" />
      </div>
    </div>
  );
}
