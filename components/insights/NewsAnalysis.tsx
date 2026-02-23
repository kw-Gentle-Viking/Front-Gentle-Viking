'use client';

import { mockNews } from '@/lib/insights/mock';

function SentimentPill({ s }: { s: '긍정' | '중립' | '부정' }) {
  const cls =
    s === '긍정'
      ? 'bg-emerald-50 text-emerald-700 ring-emerald-200'
      : s === '부정'
        ? 'bg-rose-50 text-rose-700 ring-rose-200'
        : 'bg-slate-50 text-slate-700 ring-slate-200';

  return (
    <span
      className={`rounded-full px-2 py-1 text-xs font-semibold ring-1 ${cls}`}
    >
      {s}
    </span>
  );
}

export default function NewsAnalysis() {
  return (
    <section className="rounded-2xl border border-slate-200/70 bg-white p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <h2 className="text-base font-extrabold text-slate-900">
          오늘의 뉴스 분석
        </h2>
        <button className="rounded-xl bg-blue-800 px-3 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 active:bg-blue-900">
          분석 새로고침
        </button>
      </div>

      <div className="mt-3 space-y-3">
        {mockNews.map((n) => (
          <article
            key={n.id}
            className="rounded-2xl border border-slate-200 bg-white p-4 transition hover:bg-sky-50"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-extrabold text-slate-900">
                  {n.title}
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  {n.source} · {n.time}
                </p>
              </div>
              <SentimentPill s={n.sentiment} />
            </div>

            <p className="mt-2 text-sm leading-6 text-slate-700">
              {n.summary}
            </p>

            <div className="mt-3 flex flex-wrap gap-2">
              {n.related.map((t) => (
                <span
                  key={t}
                  className="rounded-full bg-sky-50 px-2 py-1 text-xs font-semibold text-blue-800 ring-1 ring-sky-200"
                >
                  {t}
                </span>
              ))}
            </div>

            <div className="mt-3 flex gap-2">
              <button className="flex-1 rounded-xl border border-blue-800/20 bg-white px-3 py-2 text-sm font-semibold text-blue-800 shadow-sm transition hover:bg-sky-50 active:bg-sky-100">
                요약 보기
              </button>
              <button className="flex-1 rounded-xl bg-blue-800 px-3 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 active:bg-blue-900">
                관련 종목
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
