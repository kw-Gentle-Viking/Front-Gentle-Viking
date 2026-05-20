'use client';

import { mockReport } from '@/lib/insights/mock';

function formatKRW(v: number) {
  return v.toLocaleString('ko-KR');
}

function ChangeText({ pct }: { pct: number }) {
  const up = pct >= 0;
  return (
    <span className={up ? 'text-emerald-700' : 'text-rose-700'}>
      {up ? '+' : ''}
      {pct.toFixed(2)}%
    </span>
  );
}

export default function StockReport() {
  const r = mockReport;

  return (
    <section className="rounded-2xl border border-slate-200/70 bg-white p-4 shadow-sm">
      <div className="mt-4 space-y-4">
        {r.picks.map((p) => (
          <article
            key={p.rank}
            className="rounded-2xl border border-slate-200 bg-white p-4"
          >
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="text-sm font-extrabold text-slate-900">
                  {p.rank}. {p.name}{' '}
                  <span className="text-slate-500">({p.code})</span>
                </p>
                <p className="mt-1 text-sm text-slate-700">
                  현재가: {formatKRW(p.price)}원 / 등락:{' '}
                  <ChangeText pct={p.changePct} />
                </p>
              </div>

              <span className="rounded-full bg-sky-50 px-2 py-1 text-xs font-semibold text-blue-800 ring-1 ring-sky-200">
                추천
              </span>
            </div>

            <div className="mt-3 rounded-xl border border-slate-200 bg-sky-50 p-3">
              <p className="text-sm font-extrabold text-slate-900">
                선정 이유
              </p>
              <p className="mt-1 text-sm leading-6 text-slate-700">
                {p.reason}
              </p>
            </div>

            <div className="mt-3 grid gap-3 md:grid-cols-2">
              <div className="rounded-xl border border-slate-200 bg-white p-3">
                <p className="text-sm font-extrabold text-slate-900">
                  핵심 데이터
                </p>
                <ul className="mt-2 space-y-1 text-sm text-slate-700">
                  {p.highlights.map((x, i) => (
                    <li key={i} className="flex gap-2">
                      <span className="text-blue-800">•</span>
                      <span>{x}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-xl border border-slate-200 bg-white p-3">
                <p className="text-sm font-extrabold text-slate-900">
                  리스크
                </p>
                <ul className="mt-2 space-y-1 text-sm text-slate-700">
                  {p.risks.map((x, i) => (
                    <li key={i} className="flex gap-2">
                      <span className="text-rose-700">•</span>
                      <span>{x}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-3 rounded-xl border border-slate-200 bg-white p-3">
              <p className="text-sm font-extrabold text-slate-900">
                매수 가이드
              </p>
              <div className="mt-2 grid gap-2 text-sm text-slate-700 sm:grid-cols-3">
                <div className="rounded-xl bg-slate-50 p-3">
                  <p className="text-xs text-slate-500">
                    권장 투자 금액
                  </p>
                  <p className="mt-1 font-extrabold text-slate-900">
                    {formatKRW(p.guide.investKRW)}원
                  </p>
                </div>
                <div className="rounded-xl bg-slate-50 p-3">
                  <p className="text-xs text-slate-500">
                    권장 매수 수량
                  </p>
                  <p className="mt-1 font-extrabold text-slate-900">
                    {p.guide.buyQty}주
                  </p>
                </div>
                <div className="rounded-xl bg-slate-50 p-3">
                  <p className="text-xs text-slate-500">전략</p>
                  <p className="mt-1 font-extrabold text-blue-800">
                    {p.guide.strategy}
                  </p>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-4 rounded-2xl border border-slate-200/70 bg-white p-4 shadow-sm">
        <p className="text-sm font-extrabold text-slate-900">
          총 투자 요약
        </p>
        <div className="mt-2 grid gap-2 text-sm text-slate-700 sm:grid-cols-3">
          <div className="rounded-xl bg-slate-50 p-3">
            <p className="text-xs text-slate-500">총 투자 금액</p>
            <p className="mt-1 font-extrabold text-slate-900">
              {formatKRW(r.totalInvestKRW)}원
            </p>
          </div>
          <div className="rounded-xl bg-slate-50 p-3">
            <p className="text-xs text-slate-500">현금 보유 금액</p>
            <p className="mt-1 font-extrabold text-slate-900">
              {formatKRW(r.cashKRW)}원
            </p>
          </div>
          <div className="rounded-xl bg-sky-50 p-3 ring-1 ring-sky-200">
            <p className="text-xs text-slate-500">현금 비중</p>
            <p className="mt-1 font-extrabold text-blue-800">
              {r.cashRate.toFixed(2)}%
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
