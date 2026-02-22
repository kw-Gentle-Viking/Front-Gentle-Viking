import { mockAssets } from '@/lib/home/mock';

function formatKRW(v: number) {
  return v.toLocaleString('ko-KR');
}

export default function AssetsCard() {
  const a = mockAssets;
  const pnlSign = a.pnlKRW >= 0 ? '+' : '-';
  const pnlAbs = Math.abs(a.pnlKRW);

  return (
    <section className="h-full rounded-2xl border border-slate-200/70 bg-white p-4 shadow-sm">
      <div className="flex justify-between">
        <h2 className="text-base font-semibold text-slate-900">
          내 총 자산
        </h2>
        <button className="font-semibold text-blue-800 transition hover:text-blue-700">
          상세 보기
        </button>
      </div>

      <div className="mt-3 rounded-xl border border-slate-200 bg-sky-50 p-4">
        <p className="text-sm text-slate-600">총 평가자산</p>
        <p className="mt-1 text-2xl font-semibold text-slate-900">
          {formatKRW(a.totalKRW)}원
        </p>

        <div className="mt-3 flex flex-wrap gap-3 text-sm">
          <span className="text-slate-600">
            현금 {formatKRW(a.cashKRW)}원
          </span>
          <span className="text-slate-600">
            주식 {formatKRW(a.stockKRW)}원
          </span>
        </div>

        <div className="mt-3 text-sm">
          <span className="text-slate-600">손익 </span>
          <span
            className={
              a.pnlKRW >= 0 ? 'text-emerald-600' : 'text-rose-600'
            }
          >
            {pnlSign}
            {formatKRW(pnlAbs)}원 ({(a.pnlRate * 100).toFixed(2)}%)
          </span>
        </div>
      </div>
    </section>
  );
}
