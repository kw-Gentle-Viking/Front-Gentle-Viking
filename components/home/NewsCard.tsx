import { mockNews } from '@/lib/home/mock';

export default function NewsCard() {
  const n = mockNews;

  return (
    <article className="h-full rounded-2xl border border-slate-200/70 bg-white p-4 shadow-sm">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-base font-semibold text-slate-900">
          오늘의 메인 뉴스
        </h2>
        <span className="rounded-full bg-sky-50 px-2 py-1 text-xs font-medium text-blue-800 ring-1 ring-sky-200">
          {n.tag ?? 'News'}
        </span>
      </div>

      <div className="mt-3">
        <p className="text-sm text-slate-500">
          {n.source} · {n.publishedAt}
        </p>
        <p className="mt-2 text-lg font-semibold leading-snug text-slate-900">
          {n.title}
        </p>
        <p className="mt-2 min-h-[40px] line-clamp-2 text-sm leading-5 text-slate-700">
          {n.summary}
        </p>
      </div>

      <div className="mt-4 flex gap-2">
        <button className="rounded-xl bg-blue-800 px-3 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 active:bg-blue-900">
          더 보기
        </button>
        <button className="rounded-xl border border-blue-800/20 bg-white px-3 py-2 text-sm font-semibold text-blue-800 shadow-sm transition hover:bg-sky-50 active:bg-sky-100">
          관련 종목 보기
        </button>
      </div>
    </article>
  );
}
