import './globals.css';
import type { Metadata } from 'next';
import Header from './Layout/Header';
import Footer from './Layout/Footer';

export const metadata: Metadata = {
  title: 'Gentle Viking',
  description: 'AI 포트폴리오 구성 및 자동매매 서비스',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className="bg-white text-slate-900">
        <div className="min-h-screen flex flex-col">
          <Header />

          <main className="flex-1 bg-gradient-to-b from-sky-50 via-white to-white px-[24px] py-[24px] md:px-[32px]">
            <div className="mx-auto max-w-[1100px]">
              <div className="rounded-2xl border border-slate-200/70 bg-white p-[16px] shadow-sm md:p-[20px]">
                {children}
              </div>
            </div>
          </main>

          <Footer />
        </div>
      </body>
    </html>
  );
}
