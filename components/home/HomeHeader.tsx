export default function HomeHeader() {
  return (
    <header className="flex items-end justify-between gap-3">
      <div>
        <p className="text-sm text-slate-600">Gentle Viking</p>
        <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
          메인 대시보드
        </h1>
      </div>

      <div className="flex gap-2">
        <button className="rounded-xl bg-blue-800 px-3 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 active:bg-blue-900">
          새로고침
        </button>
        <button className="rounded-xl border border-blue-800/20 bg-white px-3 py-2 text-sm font-semibold text-blue-800 shadow-sm transition hover:bg-sky-50 active:bg-sky-100">
          설정
        </button>
      </div>
    </header>
  );
}
