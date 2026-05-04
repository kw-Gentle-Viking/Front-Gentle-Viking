"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPw, setShowPw] = useState(false);

  const handleLogin = () => {
    if (email === "test@gentleviking.com" && password === "1234") {
      localStorage.setItem("gv-auth", "true");
      router.push("/");
    } else {
      setError("이메일 또는 비밀번호가 올바르지 않습니다.");
    }
  };

  return (
    <div className="flex flex-1 items-center justify-center bg-gradient-to-b from-[#BACFE8] to-[#CADcF2] px-4 py-12">
      <div className="w-full max-w-[400px] rounded-2xl bg-white/90 p-8 shadow-md backdrop-blur-sm">
        <h1 className="mb-6 text-center text-2xl font-bold text-slate-800">
          로그인
        </h1>

        <div className="mb-3">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleLogin()}
            placeholder="이메일"
            className="w-full rounded-xl border border-slate-200 bg-sky-50/70 px-4 py-3 text-sm text-slate-800 outline-none placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10"
          />
        </div>

        <div className="relative mb-3">
          <input
            type={showPw ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleLogin()}
            placeholder="비밀번호"
            className="w-full rounded-xl border border-slate-200 bg-sky-50/70 px-4 py-3 pr-16 text-sm text-slate-800 outline-none placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10"
          />
          <button
            type="button"
            onClick={() => setShowPw((v) => !v)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-blue-700 hover:text-blue-900"
          >
            {showPw ? "숨김" : "보기"}
          </button>
        </div>

        {error && <p className="mb-3 text-xs text-rose-600">{error}</p>}

        <button
          onClick={handleLogin}
          className="mt-1 w-full rounded-xl bg-blue-700 py-3 text-sm font-semibold text-white transition hover:bg-blue-600 active:bg-blue-800"
        >
          로그인
        </button>

        <div className="my-4 flex items-center gap-3">
          <div className="h-px flex-1 bg-slate-200" />
          <span className="text-xs text-slate-400">또는</span>
          <div className="h-px flex-1 bg-slate-200" />
        </div>

        <button
          type="button"
          className="flex w-full items-center justify-center rounded-xl border border-slate-200 bg-white py-3 transition hover:bg-slate-50"
        >
          <FcGoogle className="text-2xl" />
        </button>

        <p className="mt-6 text-center text-sm text-slate-600">
          아직 회원이 아니신가요?{" "}
          <Link
            href="/signup"
            className="font-semibold text-blue-700 hover:underline"
          >
            회원가입
          </Link>
        </p>
      </div>
    </div>
  );
}
