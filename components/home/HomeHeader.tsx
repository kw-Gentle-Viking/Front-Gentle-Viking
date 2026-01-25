export default function HomeHeader() {
  return (
    <header className="flex items-end justify-between gap-3">
      <div>
        <p className="text-sm text-neutral-300">Gentle Viking</p>
        <h1 className="text-2xl font-semibold tracking-tight">
          메인 대시보드
        </h1>
      </div>

      <div className="flex gap-2">
        <button className="rounded-xl bg-neutral-800 px-3 py-2 text-sm hover:bg-neutral-700 transition">
          새로고침
        </button>
        <button className="rounded-xl bg-white/90 px-3 py-2 text-sm text-neutral-950 hover:bg-white transition">
          설정
        </button>
      </div>
    </header>
  );
}
