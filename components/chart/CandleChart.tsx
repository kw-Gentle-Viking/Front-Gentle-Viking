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
} from 'lightweight-charts';
import { CandleType } from '@/lib/chart/types';

type Props = {
  data: CandleType[];
};

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

  // 차트 초기화
  useEffect(() => {
    if (!containerRef.current) return;

    // 차트 생성
    const chart = createChart(containerRef.current, {
      height: 420,
      width: containerRef.current.clientWidth,
      crosshair: { mode: CrosshairMode.Normal },
      layout: {
        background: { color: 'transparent' },
        textColor: '#111827',
      },
      grid: {
        vertLines: { visible: false },
        horzLines: { visible: false },
      },
      rightPriceScale: {
        borderVisible: false,
      },
      timeScale: {
        // "HH:mm" 형태로 시간 표시
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

    // 리사이즈 대응
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

  // 데이터 변동시 차트 업데이트
  useEffect(() => {
    if (!seriesRef.current) return;
    seriesRef.current.setData(chartData);
    chartRef.current?.timeScale().fitContent();
  }, [chartData]);

  return (
    <div className="w-full rounded-2xl border border-zinc-200 bg-white/60 p-3">
      <div ref={containerRef} className="w-full" />
    </div>
  );
}
