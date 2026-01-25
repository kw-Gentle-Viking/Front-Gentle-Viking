'use client';
import HomeHeader from '@/components/home/HomeHeader';
import NewsCard from '@/components/home/NewsCard';
import AssetsCard from '@/components/home/AssetsCard';
import AITradesCard from '@/components/home/AITradesCard';
import TradingWindowCard from '@/components/home/TradingWindowCard';
import MyPfCard from '@/components/home/MyPfCard';

export default function HomePage() {
  return (
    <main className="min-h-screen text-neutral-900">
      <div className="mx-auto w-full max-w-6xl px-4 py-6">
        <HomeHeader />
        <section className="mt-6 flex gap-4">
          <div className="flex-[2]">
            <AssetsCard />
          </div>

          <div className="flex-[3]">
            <NewsCard />
          </div>
        </section>

        <section>
          <div className="mt-6 flex w-full gap-4">
            <TradingWindowCard />
          </div>
        </section>

        <section className="mt-6 flex gap-4">
          <div className="flex-[2]">
            <MyPfCard />
          </div>

          <div className="flex-[3]">
            <AITradesCard />
          </div>
        </section>
      </div>
    </main>
  );
}
