"use client";

import { useState } from "react";
import { createPortal } from "react-dom";
import { FiHeart, FiTrash2, FiX } from "react-icons/fi";

const initialWatchlist = [
  { name: "삼성전자", code: "005930", price: "81,200원", change: "+0.61%", memo: "실적 발표 전 변동성 확인" },
  { name: "SK하이닉스", code: "000660", price: "163,000원", change: "-1.25%", memo: "HBM 수급 뉴스 추적" },
  { name: "NAVER", code: "035420", price: "186,700원", change: "+2.10%", memo: "AI 서비스 매출 반영 체크" },
  { name: "LG에너지솔루션", code: "373220", price: "348,500원", change: "+2.08%", memo: "전기차 수요 회복 여부" },
];

type WatchStock = (typeof initialWatchlist)[number];

export default function WatchlistPage() {
  const [watchlist, setWatchlist] = useState(initialWatchlist);
  const [deleteTarget, setDeleteTarget] = useState<WatchStock | null>(null);
  const modalRoot = typeof document === "undefined" ? null : document.body;

  const handleDelete = () => {
    if (!deleteTarget) return;
    setWatchlist((items) => items.filter((item) => item.code !== deleteTarget.code));
    setDeleteTarget(null);
  };

  return (
    <>
      <div>
        <section className="rounded-2xl bg-white p-6 shadow-[0_24px_80px_rgba(15,23,42,0.06)] lg:p-8">
          <div className="flex flex-wrap items-start justify-between gap-5 border-b border-slate-100 pb-6">
            <div>
              <p className="text-sm font-bold text-[#5267ff]">Watchlist</p>
              <h1 className="mt-2 text-4xl font-black text-slate-950">관심 종목</h1>
              <p className="mt-3 text-sm leading-6 text-slate-500">
                AI가 매일 추천해주는 종목 중 관심 가는 종목을 장바구니처럼 담아두고 확인힙니다.
              </p>
            </div>
          </div>

          <div className="mt-6 overflow-hidden rounded-xl border border-slate-100">
            <div className="grid grid-cols-[1.2fr_0.8fr_0.8fr_1.4fr_72px] bg-slate-50 px-5 py-3 text-xs font-bold text-slate-400">
              <span>종목</span>
              <span>현재가</span>
              <span>등락률</span>
              <span>메모</span>
              <span className="text-right">관리</span>
            </div>
            {watchlist.map((stock) => (
              <div key={stock.code} className="grid grid-cols-[1.2fr_0.8fr_0.8fr_1.4fr_72px] items-center border-t border-slate-100 px-5 py-4 text-sm">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-rose-50 text-rose-500">
                    <FiHeart className="h-4 w-4 fill-current" />
                  </span>
                  <div>
                    <p className="font-black text-slate-950">{stock.name}</p>
                    <p className="text-xs text-slate-400">{stock.code}</p>
                  </div>
                </div>
                <span className="font-bold text-slate-950">{stock.price}</span>
                <span className={`font-black ${stock.change.startsWith("-") ? "text-blue-500" : "text-rose-500"}`}>{stock.change}</span>
                <span className="text-slate-500">{stock.memo}</span>
                <button
                  type="button"
                  onClick={() => setDeleteTarget(stock)}
                  title={`${stock.name} 삭제`}
                  className="ml-auto flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 transition hover:bg-rose-50 hover:text-rose-500"
                >
                  <FiTrash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </section>
      </div>

      {modalRoot && deleteTarget
        ? createPortal(
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/45 px-5 backdrop-blur-sm">
          <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-[0_24px_80px_rgba(15,23,42,0.22)]">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-lg font-black text-slate-950">관심 종목 삭제</p>
                <p className="mt-2 text-sm leading-6 text-slate-500">
                  {deleteTarget.name}을 관심 종목에서 삭제할까요?
                </p>
              </div>
              <button
                type="button"
                onClick={() => setDeleteTarget(null)}
                title="닫기"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-950"
              >
                <FiX className="h-4 w-4" />
              </button>
            </div>
            <div className="mt-6 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setDeleteTarget(null)}
                className="h-11 rounded-xl bg-slate-100 px-4 text-sm font-black text-slate-600 transition hover:bg-slate-200"
              >
                취소
              </button>
              <button
                type="button"
                onClick={handleDelete}
                className="h-11 rounded-xl bg-rose-500 px-4 text-sm font-black text-white transition hover:bg-rose-600"
              >
                삭제하기
              </button>
            </div>
          </div>
        </div>,
        modalRoot,
        )
        : null}
    </>
  );
}
