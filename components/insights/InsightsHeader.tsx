'use client';
import { mockReport } from '@/lib/insights/mock';

function formatKRW(v: number) {
  return v.toLocaleString('ko-KR');
}

function formatKRTDateHour(d: Date) {
  const m = d.getMonth() + 1;
  const day = d.getDate();
  const h = d.getHours();
  return `${m}월 ${day}일 ${h}시`;
}

export default function InsightsHeader() {
  const r = mockReport;

  const generatedAt = formatKRTDateHour(new Date());

  return (
    <div className="rounded-2xl border border-slate-200/70 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <h1 className="mt-1 text-2xl font-extrabold tracking-tight text-slate-900">
              📌 Gentle Viking의 오늘의 추천 종목
            </h1>
          </div>
          <p className="mt-2 text-sm text-slate-600">
            {r.profileTitle}
          </p>
          <p className="mt-2 text-sm leading-6 text-slate-700">
            총 투자 가능 금액{' '}
            <span className="font-extrabold text-slate-900">
              {formatKRW(r.totalInvestKRW)}원
            </span>
            을 기준으로 포트폴리오를 구성합니다.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="whitespace-nowrap rounded-full bg-sky-50 px-3 py-1 text-xs font-semibold text-blue-800 ring-1 ring-sky-200">
            {generatedAt}
          </span>
          <button className="whitespace-nowrap rounded-xl bg-blue-800 px-3 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 active:bg-blue-900">
            새리포트 생성
          </button>
        </div>
      </div>
    </div>
  );
}
