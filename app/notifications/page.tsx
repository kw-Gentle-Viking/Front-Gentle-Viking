"use client";

import { FiBell, FiCheckCircle } from "react-icons/fi";

const notifications = [
  { title: "AI 추천 종목 업데이트", desc: "오늘의 추천 종목 5개가 새로 계산되었습니다.", time: "09:00" },
  { title: "관심 종목 가격 변동", desc: "NAVER가 설정한 관심 구간에 진입했습니다.", time: "10:24" },
  { title: "포트폴리오 리스크 알림", desc: "반도체 업종 비중이 목표 범위를 초과했습니다.", time: "13:10" },
];

export default function NotificationsPage() {
  return (
    <section className="rounded-2xl bg-white p-6 shadow-[0_24px_80px_rgba(15,23,42,0.06)] lg:p-8">
      <div className="mb-8 flex items-start gap-4 border-b border-slate-100 pb-6">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#eef2ff] text-[#5267ff]">
          <FiBell className="h-5 w-5" />
        </div>
        <div>
          <p className="text-sm font-bold text-[#5267ff]">Notifications</p>
          <h1 className="mt-2 text-4xl font-black text-slate-950">알림</h1>
          <p className="mt-3 text-sm leading-6 text-slate-500">투자 활동과 AI 분석 결과에 대한 알림을 확인합니다.</p>
        </div>
      </div>

      <div className="space-y-3">
        {notifications.map((item) => (
          <article key={item.title} className="flex items-center justify-between gap-5 rounded-xl border border-slate-100 p-5 transition hover:bg-slate-50">
            <div className="flex items-start gap-3">
              <FiCheckCircle className="mt-0.5 h-5 w-5 text-[#5267ff]" />
              <div>
                <p className="font-black text-slate-950">{item.title}</p>
                <p className="mt-1 text-sm text-slate-500">{item.desc}</p>
              </div>
            </div>
            <span className="text-xs font-bold text-slate-400">{item.time}</span>
          </article>
        ))}
      </div>
    </section>
  );
}
