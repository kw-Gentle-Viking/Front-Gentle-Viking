'use client';
import { useEffect, useMemo, useRef } from 'react';
import {
  createChart,
  CrosshairMode,
  IChartApi,
  ISeriesApi,
  CandlestickData,
  UTCTimestamp,
  CandlestickSeries,
  LogicalRange,
  SeriesMarker,
} from 'lightweight-charts';
import { CandleType } from '@/lib/chart/types';

type Props = {
  data: CandleType[];
};

function computeHighLowPoint(
  data: CandlestickData<UTCTimestamp>[],
  range: LogicalRange | null,
) {
  if (!range || data.length === 0) return null;

  const from = Math.max(0, Math.floor(range.from));
  const to = Math.min(data.length - 1, Math.ceil(range.to));

  let hi = -Infinity;
  let lo = Infinity;
  let hiIdx = -1;
  let loIdx = -1;

  for (let i = from; i <= to; i++) {
    const c = data[i];
    if (!c) continue;

    if (c.high > hi) {
      hi = c.high;
      hiIdx = i;
    }
    if (c.low < lo) {
      lo = c.low;
      loIdx = i;
    }
  }

  if (hiIdx < 0 || loIdx < 0) return null;

  return {
    hi,
    lo,
    hiTime: data[hiIdx].time,
    loTime: data[loIdx].time,
  };
}

export default function CandleChart({ data }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const seriesRef = useRef<ISeriesApi<'Candlestick'> | null>(null);

  const chartData: CandlestickData[] = useMemo(() => {
    return data.map((d) => ({
      time: d.time as UTCTimestamp,
      open: d.open,
      high: d.high,
      low: d.low,
      close: d.close,
    }));
  }, [data]);

  useEffect(() => {
    if (!containerRef.current) return;

    const chart = createChart(containerRef.current, {
      height: 420,
      width: containerRef.current.clientWidth,
      crosshair: { mode: CrosshairMode.Normal },
      layout: {
        background: { color: 'transparent' },
        textColor: '#0F172A',
      },
      grid: {
        vertLines: { visible: false },
        horzLines: { visible: false },
      },
      rightPriceScale: {
        borderVisible: false,
      },
      timeScale: {
        secondsVisible: false,
        tickMarkFormatter: (time: UTCTimestamp) => {
          const d = new Date((time as UTCTimestamp) * 1000);
          return d.toLocaleTimeString('ko-KR', {
            hour: '2-digit',
            minute: '2-digit',
          });
        },
      },
    });

    const series = chart.addSeries(CandlestickSeries, {
      priceFormat: {
        type: 'custom',
        formatter: (price: number) =>
          `${price.toLocaleString('ko-KR')}원`,
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
    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('resize', onResize);
      chart.remove();
      chartRef.current = null;
      seriesRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (!seriesRef.current) return;
    seriesRef.current.setData(chartData);
    chartRef.current?.timeScale().fitContent();
  }, [chartData]);

  return (
    <div className="w-full rounded-2xl border border-slate-200/70 bg-white p-3 shadow-sm">
      <div ref={containerRef} className="w-full" />
    </div>
  );
}
