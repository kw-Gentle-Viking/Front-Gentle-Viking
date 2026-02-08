// 사용 안하는 파일 : 2026/2/8 기준

import type { Candle } from '@/lib/home/types';

type Props = {
  data: Candle[];
  height?: number;
};

export default function CandlesChart({ data, height = 140 }: Props) {
  if (!data.length) return null;

  const w = 680; // viewBox width
  const h = height;

  const highs = data.map((d) => d.h);
  const lows = data.map((d) => d.l);
  const maxY = Math.max(...highs);
  const minY = Math.min(...lows);

  const padTop = 10;
  const padBottom = 10;
  const innerH = h - padTop - padBottom;

  const xStep = w / Math.max(data.length, 1);
  const bodyW = Math.max(6, Math.floor(xStep * 0.45));

  const y = (v: number) => {
    const t = (v - minY) / (maxY - minY || 1);
    return padTop + (1 - t) * innerH;
  };

  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      className="w-full rounded-xl bg-neutral-900/20"
      role="img"
      aria-label="candlestick-mini-chart"
    >
      {/* grid */}
      <g opacity="0.35">
        {[0.2, 0.4, 0.6, 0.8].map((p) => (
          <line
            key={p}
            x1="0"
            x2={w}
            y1={padTop + p * innerH}
            y2={padTop + p * innerH}
            stroke="currentColor"
            className="text-neutral-900"
            strokeWidth="1"
          />
        ))}
      </g>

      {data.map((d, i) => {
        const x = i * xStep + xStep / 2;
        const up = d.c >= d.o;

        const yOpen = y(d.o);
        const yClose = y(d.c);
        const yHigh = y(d.h);
        const yLow = y(d.l);

        const bodyTop = Math.min(yOpen, yClose);
        const bodyBot = Math.max(yOpen, yClose);
        const bodyH = Math.max(2, bodyBot - bodyTop);

        return (
          <g key={d.t + i}>
            {/* wick */}
            <line
              x1={x}
              x2={x}
              y1={yHigh}
              y2={yLow}
              stroke="currentColor"
              className={up ? 'text-emerald-500' : 'text-rose-500'}
              strokeWidth="2"
              opacity="0.9"
            />
            {/* body */}
            <rect
              x={x - bodyW / 2}
              y={bodyTop}
              width={bodyW}
              height={bodyH}
              rx="2"
              className={up ? 'fill-emerald-500' : 'fill-rose-500'}
              opacity="0.9"
            />
          </g>
        );
      })}
    </svg>
  );
}
