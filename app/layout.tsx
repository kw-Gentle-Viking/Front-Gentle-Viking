import "./globals.css";
import type { Metadata } from "next";
import { SidebarProvider } from "../components/sidebar/SidebarContext";
import Header from "./Layout/Header";
import Footer from "./Layout/Footer";
import Sidebar from "./Layout/Sidebar";

export const metadata: Metadata = {
  title: "Gentle Viking",
  description: "AI 포트폴리오 구성 및 자동매매 서비스",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className="bg-white text-[#333D4B]">
        <SidebarProvider>
          <div className="min-h-screen flex flex-col">
            <Sidebar />
            <Header />

            <main className="flex-1 flex overflow-hidden z-0">{children}</main>
            <Footer />
          </div>
        </SidebarProvider>
      </body>
    </html>
  );
}
