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
    if (email === 'test@gentleviking.com' && password === '1234') {
      localStorage.setItem('gv-auth', 'true');
      router.push('/');
    } else {
      setError('이메일 또는 비밀번호가 올바르지 않습니다.');
    }
  };

  return (
    <div className="mx-auto mt-[80px] max-w-[380px] rounded-[16px] border border-slate-200/70 bg-white p-[24px] shadow-sm animate-slide-up">
      <h1 className="text-[22px] font-semibold text-slate-900">
        로그인
      </h1>
      <p className="mt-[6px] text-[13px] text-slate-600">
        Gentle Viking에 오신 것을 환영합니다
      </p>

      <div className="mt-[20px]">
        <label className="mb-[6px] block text-[12px] text-slate-700">
          이메일
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="test@gentleviking.com"
          className="w-full rounded-[12px] border border-slate-200 bg-sky-50 px-[12px] py-[12px] text-[14px] text-slate-900 outline-none placeholder:text-slate-400 focus:border-blue-800 focus:ring-2 focus:ring-blue-800/10"
        />
      </div>

      <div className="mt-[14px]">
        <label className="mb-[6px] block text-[12px] text-slate-700">
          비밀번호
        </label>

        <div className="relative">
          <input
            type={showPw ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="비밀번호를 입력하세요"
            className="w-full rounded-[12px] border border-slate-200 bg-sky-50 px-[12px] py-[12px] pr-[56px] text-[14px] text-slate-900 outline-none placeholder:text-slate-400 focus:border-blue-800 focus:ring-2 focus:ring-blue-800/10"
          />

          <button
            type="button"
            onClick={() => setShowPw((v) => !v)}
            className="absolute right-[10px] top-1/2 -translate-y-1/2 rounded-[8px] px-[8px] py-[6px] text-[12px] font-semibold text-blue-800 hover:bg-sky-50"
          >
            {showPw ? '숨김' : '보기'}
          </button>
        </div>
      </div>

      {error && (
        <p className="mt-[12px] text-[12px] text-rose-600">{error}</p>
      )}

      <button
        onClick={handleLogin}
        className="mt-[22px] w-full rounded-[12px] bg-blue-800 py-[12px] text-[14px] font-semibold text-white shadow-sm transition hover:bg-blue-700 active:bg-blue-900"
      >
        로그인
      </button>
    </div>
  );
};

export default Login;
