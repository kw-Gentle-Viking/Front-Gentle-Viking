import Link from 'next/link';

export default function MyPfCard() {
  return (
    <section className="h-full rounded-2xl border border-slate-200/70 bg-white p-4 shadow-sm">
      <h2 className="text-base font-semibold text-slate-900">
        내 포트폴리오
      </h2>
      <p className="mt-2 text-sm text-slate-600">
        보유 종목/비중/성과를 한 번에 확인합니다.
      </p>

      <div className="mt-4 flex gap-2">
        <Link
          href="/portfolio"
          className="inline-flex items-center justify-center rounded-xl bg-blue-800 px-3 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 active:bg-blue-900"
        >
          포트폴리오 보러가기
        </Link>
        <button className="rounded-xl border border-blue-800/20 bg-white px-3 py-2 text-sm font-semibold text-blue-800 shadow-sm transition hover:bg-sky-50 active:bg-sky-100">
          리밸런싱 제안
        </button>
      </div>
    </section>
  );
}
