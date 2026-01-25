import { mockAssets } from '@/lib/home/mock';

function formatKRW(v: number) {
  return v.toLocaleString('ko-KR');
}

export default function AssetsCard() {
  const a = mockAssets;
  const pnlSign = a.pnlKRW >= 0 ? '+' : '-';
  const pnlAbs = Math.abs(a.pnlKRW);

  return (
    <section className="rounded-2xl border border-neutral-200 bg-neutral-50 p-4 shadow-sm">
      <h2 className="text-base font-semibold">내 총 자산</h2>

      <div className="mt-3 rounded-xl bg-neutral-800/10 p-4">
        <p className="text-sm text-neutral-600">총 평가자산</p>
        <p className="mt-1 text-2xl font-semibold">
          {formatKRW(a.totalKRW)}원
        </p>

        <div className="mt-3 flex flex-wrap gap-3 text-sm">
          <span className="text-neutral-600">
            현금 {formatKRW(a.cashKRW)}원
          </span>
          <span className="text-neutral-600">
            주식 {formatKRW(a.stockKRW)}원
          </span>
        </div>

        <div className="mt-3 text-sm">
          <span className="text-neutral-600">손익 </span>
          <span
            className={
              a.pnlKRW >= 0 ? 'text-emerald-400' : 'text-rose-400'
            }
          >
            {pnlSign}
            {formatKRW(pnlAbs)}원 ({(a.pnlRate * 100).toFixed(2)}%)
          </span>
        </div>
      </div>

      <div className="mt-4 flex gap-2">
        <button className="rounded-xl bg-neutral-200 px-3 py-2 text-sm hover:bg-neutral-300 transition">
          상세 보기
        </button>
      </div>
    </section>
  );
}
