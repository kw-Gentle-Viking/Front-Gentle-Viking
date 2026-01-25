import { mockTrades } from '@/lib/home/mock';

export default function AITradesCard() {
  return (
    <section className="rounded-2xl border border-neutral-800 bg-neutral-900/40 p-4">
      <div className="flex items-center justify-between">
        <h2 className="text-base font-semibold">최근 AI 거래</h2>
        <button className="rounded-xl bg-neutral-800 px-3 py-2 text-sm hover:bg-neutral-700 transition">
          전체 보기
        </button>
      </div>

      <div className="mt-3 overflow-hidden rounded-xl border border-neutral-800">
        <ul className="divide-y divide-neutral-800">
          {mockTrades.map((t) => (
            <li
              key={t.id}
              className="flex items-start justify-between gap-3 bg-neutral-950/30 p-3"
            >
              <div>
                <p className="text-sm font-semibold">
                  {t.action === 'BUY' ? '매수' : '매도'} · {t.symbol}
                  <span className="ml-2 text-xs text-neutral-400">
                    {t.time}
                  </span>
                </p>
                <p className="text-xs text-neutral-300">
                  {t.qty}주 · {t.price.toLocaleString('ko-KR')}원
                </p>
                {t.reason && (
                  <p className="mt-1 text-xs text-neutral-400">
                    사유: {t.reason}
                  </p>
                )}
              </div>

              <span
                className={
                  'rounded-full px-2 py-1 text-xs ' +
                  (t.action === 'BUY'
                    ? 'bg-emerald-400/15 text-emerald-300'
                    : 'bg-rose-400/15 text-rose-300')
                }
              >
                {t.action}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
