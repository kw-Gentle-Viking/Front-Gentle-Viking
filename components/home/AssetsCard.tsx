import { mockAssets } from '@/lib/home/mock';

function formatKRW(v: number) {
  return v.toLocaleString('ko-KR');
}

export default function AssetsCard() {
  const a = mockAssets;
  const pnlSign = a.pnlKRW >= 0 ? '+' : '-';
  const pnlAbs = Math.abs(a.pnlKRW);

  return (
    <section className="rounded-2xl border border-neutral-800 bg-neutral-900/40 p-4">
      <h2 className="text-base font-semibold">내 총 자산</h2>

      <div className="mt-3 rounded-xl bg-neutral-950/40 p-4">
        <p className="text-sm text-neutral-300">총 평가자산</p>
        <p className="mt-1 text-2xl font-semibold">
          {formatKRW(a.totalKRW)}원
        </p>

        <div className="mt-3 flex flex-wrap gap-3 text-sm">
          <span className="text-neutral-300">
            현금 {formatKRW(a.cashKRW)}원
          </span>
          <span className="text-neutral-300">
            주식 {formatKRW(a.stockKRW)}원
          </span>
        </div>

        <div className="mt-3 text-sm">
          <span className="text-neutral-300">손익 </span>
          <span
            className={
              a.pnlKRW >= 0 ? 'text-emerald-300' : 'text-rose-300'
            }
          >
            {pnlSign}
            {formatKRW(pnlAbs)}원 ({(a.pnlRate * 100).toFixed(2)}%)
          </span>
        </div>
      </div>

      <div className="mt-4 flex gap-2">
        <button className="rounded-xl bg-neutral-800 px-3 py-2 text-sm hover:bg-neutral-700 transition">
          상세 보기
        </button>
      </div>
    </section>
  );
}
