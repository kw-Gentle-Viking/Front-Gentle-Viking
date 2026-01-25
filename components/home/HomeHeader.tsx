export default function HomeHeader() {
  return (
    <header className="flex items-end justify-between gap-3">
      <div>
        <p className="text-sm text-neutral-50">Gentle Viking</p>
        <h1 className="text-2xl font-semibold tracking-tight text-neutral-50">
          메인 대시보드
        </h1>
      </div>

      <div className="flex gap-2">
        <button className="rounded-xl bg-neutral-200 px-3 py-2 text-sm hover:bg-neutral-300 transition">
          새로고침
        </button>
        <button className="rounded-xl bg-neutral-200 px-3 py-2 text-sm text-neutral-950 hover:bg-neutral-300 transition">
          설정
        </button>
      </div>
    </header>
  );
}
