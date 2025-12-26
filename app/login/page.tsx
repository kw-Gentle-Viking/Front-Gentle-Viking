'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPw, setShowPw] = useState(false);

  const handleLogin = () => {
    // 백엔드 연결 필요, localStorage 임시 구현
    if (email === 'test@gentleviking.com' && password === '1234') {
      localStorage.setItem('gv-auth', 'true');
      router.push('/');
    } else {
      setError('이메일 또는 비밀번호가 올바르지 않습니다.');
    }
  };

  return (
    <div className="mx-auto mt-[80px] max-w-[380px] rounded-[16px] bg-white/40 p-[24px] ring-2 ring-white/10 backdrop-blur animate-slide-up">
      <h1 className="text-[22px] font-semibold text-zinc-900">
        로그인
      </h1>
      <p className="mt-[6px] text-[13px] text-zinc-800">
        Gentle Viking에 오신 것을 환영합니다
      </p>

      <div className="mt-[20px]">
        <label className="mb-[6px] block text-[12px] text-zinc-900">
          이메일
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="test@gentleviking.com"
          className="w-full rounded-[12px] bg-zinc-300/60 px-[12px] py-[12px] text-[14px] text-zinc-900 ring-1 ring-white/10 
          placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-blue-500/40"
        />
      </div>

      {/* 비밀번호 + 보기 토글 */}
      <div className="mt-[14px]">
        <label className="mb-[6px] block text-[12px] text-zinc-900">
          비밀번호
        </label>

        <div className="relative">
          <input
            type={showPw ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="비밀번호를 입력하세요"
            className="w-full rounded-[12px] bg-zinc-300/60 px-[12px] py-[12px] pr-[48px] text-[14px] text-zinc-900 ring-1 ring-white/10 
            placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-blue-500/40"
          />

          <button
            type="button"
            onClick={() => setShowPw((v) => !v)}
            className="absolute right-[10px] top-1/2 -translate-y-1/2 rounded-[8px] px-[8px] py-[6px] text-[12px] text-zinc-600 hover:bg-white/20 hover:text-zinc-100"
          >
            {showPw ? '숨김' : '보기'}
          </button>
        </div>
      </div>

      {error && (
        <p className="mt-[12px] text-[12px] text-red-600">{error}</p>
      )}

      <button
        onClick={handleLogin}
        className="mt-[22px] w-full rounded-[12px] bg-[#1E40AF] py-[12px] text-[14px] font-semibold text-white hover:bg-[#1E40AF]/80"
      >
        로그인
      </button>
    </div>
  );
};

export default Login;
