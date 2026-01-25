import { mockTrades } from '@/lib/home/mock';

export default function AITradesCard() {
  return (
    <section className="h-full rounded-2xl border border-neutral-200 bg-neutral-50 p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <h2 className="text-base font-semibold">최근 AI 거래</h2>
        <button className="rounded-xl bg-neutral-200 px-3 py-2 text-sm hover:bg-neutral-300 transition">
          전체 보기
        </button>
      </div>

      <div className="mt-3 overflow-hidden rounded-xl border-2 border-neutral-300">
        <ul className="divide-y divide-neutral-200">
          {mockTrades.map((t) => (
            <li
              key={t.id}
              className="flex items-start justify-between gap-3 bg-neutral-50 p-3"
            >
              <div>
                <p className="text-sm font-semibold">
                  {t.action === 'BUY' ? '매수' : '매도'} · {t.symbol}
                  <span className="ml-2 text-xs text-neutral-600">
                    {t.time}
                  </span>
                </p>
                <p className="text-xs text-neutral-600">
                  {t.qty}주 · {t.price.toLocaleString('ko-KR')}원
                </p>
                {t.reason && (
                  <p className="mt-1 text-xs text-neutral-600">
                    사유: {t.reason}
                  </p>
                )}
              </div>

              <span
                className={
                  'rounded-full px-2 py-1 text-xs ' +
                  (t.action === 'BUY'
                    ? 'bg-emerald-500/15 text-emerald-500'
                    : 'bg-rose-500/15 text-rose-500')
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
