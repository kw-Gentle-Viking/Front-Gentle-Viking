'use client';

import { useEffect, useState } from 'react';
import CandlesChart from '@/components/chart/CandleChart';
import { loadCandlesFromCsv } from '@/lib/chart/parseStockCsv';
import { CandleType } from '@/lib/chart/types';

export default function TradingWindowCard() {
  const [symbol, setSymbol] = useState('005930');
  //const [qty, setQty] = useState(1);

  const [candles, setCandles] = useState<CandleType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    loadCandlesFromCsv(`/${symbol}.csv`)
      .then(setCandles)
      .finally(() => setLoading(false));
  }, [symbol]);

  return (
    <section className="w-full rounded-2xl border border-slate-200/70 bg-white p-4 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-base font-semibold text-slate-900">
          주식 거래창
        </h2>

        <div className="flex items-center gap-2 text-sm">
          <span className="text-slate-600">종목</span>
          <input
            value={symbol}
            onChange={(e) => setSymbol(e.target.value)}
            className="w-24 rounded-lg border border-slate-200 bg-sky-50 px-2 py-1 text-slate-900 outline-none focus:border-blue-800 focus:ring-2 focus:ring-blue-800/10"
            placeholder="종목 코드"
          />
        </div>
      </div>

      <div className="mt-3">
        {loading ? (
          <div className="rounded-xl border border-slate-200 bg-white p-6 text-sm text-slate-500">
            차트 로딩 중…
          </div>
        ) : (
          <div className="rounded-xl border border-slate-200 bg-white p-2">
            <CandlesChart data={candles} />
          </div>
        )}
      </div>

      {/* <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
          <p className="text-xs text-slate-600">수량</p>
          <input
            type="number"
            min={1}
            value={qty}
            onChange={(e) =>
              setQty(Math.max(1, Number(e.target.value)))
            }
            className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-2 py-2 text-sm text-slate-900 outline-none focus:border-blue-800 focus:ring-2 focus:ring-blue-800/10"
          />
        </div>

        <button className="rounded-xl bg-blue-800 px-3 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 active:bg-blue-900">
          매수
        </button>
        <button className="rounded-xl border border-blue-800/20 bg-white px-3 py-3 text-sm font-semibold text-blue-800 shadow-sm transition hover:bg-sky-50 active:bg-sky-100">
          매도
        </button>
      </div> */}
    </section>
  );
}
