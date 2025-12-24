import Header from './Layout/Header';
import Footer from './Layout/Footer';

export const metadata = {
  title: 'Gentle Viking',
  description: 'Ai 포트폴리오 구성 및 자동매매 서비스',
};

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 bg-gray-100 px-lg py-lg">
          {children}
        </main>
        <Footer />
      </div>
    </>
  );
}
