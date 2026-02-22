import { mockTrades } from '@/lib/home/mock';

export default function AITradesCard() {
  return (
    <section className="h-full rounded-2xl border border-slate-200/70 bg-white p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <h2 className="text-base font-semibold text-slate-900">
          최근 AI 거래
        </h2>
        <button className="rounded-xl bg-blue-800 px-3 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 active:bg-blue-900">
          전체 보기
        </button>
      </div>

      <div className="mt-3 overflow-hidden rounded-xl border border-slate-200">
        <ul className="divide-y divide-slate-200">
          {mockTrades.map((t) => (
            <li
              key={t.id}
              className="flex items-start justify-between gap-3 bg-white p-3"
            >
              <div>
                <p className="text-sm font-semibold text-slate-900">
                  {t.action === 'BUY' ? '매수' : '매도'} · {t.symbol}
                  <span className="ml-2 text-xs text-slate-500">
                    {t.time}
                  </span>
                </p>
                <p className="text-xs text-slate-600">
                  {t.qty}주 · {t.price.toLocaleString('ko-KR')}원
                </p>
                {t.reason && (
                  <p className="mt-1 text-xs text-slate-600">
                    사유: {t.reason}
                  </p>
                )}
              </div>

              <span
                className={
                  'rounded-full px-2 py-1 text-xs font-semibold ring-1 ' +
                  (t.action === 'BUY'
                    ? 'bg-emerald-50 text-emerald-700 ring-emerald-200'
                    : 'bg-rose-50 text-rose-700 ring-rose-200')
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
