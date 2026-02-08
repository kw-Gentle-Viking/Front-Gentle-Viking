'use client';

import { useEffect, useState } from 'react';
import CandlesChart from '@/components/chart/CandleChart';
import { loadCandlesFromCsv } from '@/lib/chart/parseStockCsv';
import { CandleType } from '@/lib/chart/types';

export default function TradingWindowCard() {
  const [symbol, setSymbol] = useState('005930');
  const [qty, setQty] = useState(1);

  const [candles, setCandles] = useState<CandleType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    loadCandlesFromCsv(`/${symbol}.csv`)
      .then(setCandles)
      .finally(() => setLoading(false));
  }, [symbol]);

  return (
    <section className="w-full rounded-2xl border border-neutral-200 bg-neutral-50 p-4 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-base font-semibold">주식 거래창</h2>

        <div className="flex items-center gap-2 text-sm">
          <span className="text-neutral-600">종목</span>
          <input
            value={symbol}
            onChange={(e) => setSymbol(e.target.value)}
            className="w-24 rounded-lg border border-neutral-200 bg-neutral-200 px-2 py-1 text-neutral-950 outline-none focus:border-neutral-600"
            placeholder="종목 코드"
          />
        </div>
      </div>

      <div className="mt-3">
        {loading ? (
          <div className="rounded-xl border border-neutral-200 bg-white p-6 text-sm text-neutral-500">
            차트 로딩 중…
          </div>
        ) : (
          <CandlesChart data={candles} />
        )}
      </div>

      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
        <div className="rounded-xl border border-neutral-300 bg-neutral-100 p-3">
          <p className="text-xs text-neutral-600">수량</p>
          <input
            type="number"
            min={1}
            value={qty}
            onChange={(e) =>
              setQty(Math.max(1, Number(e.target.value)))
            }
            className="mt-1 w-full rounded-lg border border-neutral-200 bg-neutral-200 px-2 py-2 text-sm outline-none focus:border-neutral-600"
          />
        </div>

        <button className="rounded-xl bg-emerald-400/90 px-3 py-3 text-sm font-semibold text-neutral-950 transition hover:bg-emerald-300">
          매수
        </button>
        <button className="rounded-xl bg-rose-400/90 px-3 py-3 text-sm font-semibold text-neutral-950 transition hover:bg-rose-300">
          매도
        </button>
      </div>
    </section>
  );
}
