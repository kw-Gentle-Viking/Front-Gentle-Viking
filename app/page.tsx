'use client';
import HomeHeader from '@/components/home/HomeHeader';
import NewsCard from '@/components/home/NewsCard';
import AssetsCard from '@/components/home/AssetsCard';
import AITradesCard from '@/components/home/AITradesCard';
import TradingWindowCard from '@/components/home/TradingWindowCard';
import MyPfCard from '@/components/home/MyPfCard';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-sky-50 via-sky-30 to-white text-slate-900">
      <div className="mx-auto w-full max-w-6xl px-4 py-6 md:px-6 md:py-8">
        <div className="rounded-2xl border border-slate-200/70 bg-white/80 p-4 shadow-sm backdrop-blur md:p-6">
          <HomeHeader />
        </div>

        <section className="mt-6 grid gap-4 md:grid-cols-5">
          <div className="md:col-span-2">
            <div className="rounded-2xl border border-slate-200/70 bg-white p-4 shadow-sm">
              <AssetsCard />
            </div>
          </div>

          <div className="md:col-span-3">
            <div className="rounded-2xl border border-slate-200/70 bg-white p-4 shadow-sm">
              <NewsCard />
            </div>
          </div>
        </section>

        <section className="mt-6">
          <div className="rounded-2xl border border-slate-200/70 bg-white p-4 shadow-sm">
            <TradingWindowCard />
          </div>
        </section>

        <section className="mt-6 grid gap-4 md:grid-cols-5">
          <div className="md:col-span-2">
            <div className="rounded-2xl border border-slate-200/70 bg-white p-4 shadow-sm">
              <MyPfCard />
            </div>
          </div>

          <div className="md:col-span-3">
            <div className="rounded-2xl border border-slate-200/70 bg-white p-4 shadow-sm">
              <AITradesCard />
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
