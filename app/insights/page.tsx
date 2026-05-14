'use client';

import InsightsHeader from '@/components/insights/InsightsHeader';
import NewsAnalysisPanel from '@/components/insights/NewsAnalysis';
import StockReportCard from '@/components/insights/StockReport';

export default function InsightsPage() {
  return (
    <main className="min-h-[calc(100vh-64px)] bg-gradient-to-b from-sky-50 via-white to-white px-[24px] py-[24px] md:px-[32px]">
      <div className="mx-auto max-w-[1100px] space-y-4">
        <InsightsHeader />

        <div className="grid gap-4 lg:grid-cols-5">
          <div className="lg:col-span-2 space-y-3">
            <NewsAnalysisPanel />

            <button
              type="button"
              className="w-full rounded-2xl border border-blue-800/20 bg-white px-4 py-3 text-sm font-extrabold text-blue-800 shadow-sm transition hover:bg-sky-50 active:bg-sky-100"
            >
              투자 성향 변경하기
            </button>
          </div>

          <div className="lg:col-span-3">
            <StockReportCard />
          </div>
        </div>
      </div>
    </main>
  );
}
