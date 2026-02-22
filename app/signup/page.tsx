'use client';

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';

import { BasicForm, RiskProfile } from '@/lib/signup/types';
import SignupForm from '@/components/signup/SignupForm';
import Survey from '@/components/signup/Survey';

type Step = 1 | 2;

type PwRules = {
  lengthOk: boolean;
  hasLetter: boolean;
  hasNumber: boolean;
  noSpace: boolean;
};

function isEmailValid(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

function checkPassword(pw: string): PwRules {
  return {
    lengthOk: pw.length >= 8 && pw.length <= 20,
    hasLetter: /[A-Za-z]/.test(pw),
    hasNumber: /[0-9]/.test(pw),
    noSpace: !/\s/.test(pw),
  };
}

function isPasswordValid(pw: string) {
  const r = checkPassword(pw);
  return r.lengthOk && r.hasLetter && r.hasNumber && r.noSpace;
}

const SignupPage = () => {
  const router = useRouter();

  const [step, setStep] = useState<Step>(1);

  const [basicForm, setBasicForm] = useState<BasicForm>({
    name: '',
    email: '',
    pw1: '',
    pw2: '',
    nickname: '',
    birthdate: '',
    phone: '',
    consetRequired: false,
  });

  const [survey, setSurvey] = useState<RiskProfile>({
    goal: 'PRESERVE',
    horizon: 'LT3M',
    lossTolerance: 'LT5',
    experience: 'NONE',
    volatility: 'LOW',
  });

  const [touched, setTouched] = useState<
    Record<keyof BasicForm, boolean>
  >({
    name: false,
    email: false,
    pw1: false,
    pw2: false,
    nickname: false,
    birthdate: false,
    phone: false,
    consetRequired: false,
  });

  const pwRules = useMemo(
    () => checkPassword(basicForm.pw1),
    [basicForm.pw1],
  );

  const basicErrors = useMemo(() => {
    const e: Partial<Record<keyof BasicForm, string>> = {};

    if (!basicForm.name.trim()) e.name = '이름을 입력해주세요.';
    if (!basicForm.nickname.trim())
      e.nickname = '닉네임을 입력해주세요.';

    if (!basicForm.email.trim()) e.email = '이메일을 입력해주세요.';
    else if (!isEmailValid(basicForm.email))
      e.email = '이메일 형식이 올바르지 않습니다.';
    if (!basicForm.birthdate)
      e.birthdate = '생년월일을 선택해주세요.';

    if (!basicForm.pw1) e.pw1 = '비밀번호를 입력해주세요.';
    else if (!isPasswordValid(basicForm.pw1))
      e.pw1 = '비밀번호 조건을 확인해주세요.';
    if (!basicForm.pw2) e.pw2 = '비밀번호를 한 번 더 입력해주세요.';
    else if (basicForm.pw2 !== basicForm.pw1)
      e.pw2 = '비밀번호가 일치하지 않습니다.';

    if (!basicForm.consetRequired)
      e.consetRequired = '필수 동의가 필요합니다.';

    return e;
  }, [basicForm]);

  const canGoStep2 = useMemo(
    () => Object.keys(basicErrors).length === 0,
    [basicErrors],
  );

  const surveyScore = useMemo(() => {
    let s = 0;
    s += (
      { PRESERVE: 1, STABLE: 2, GROWTH: 3, AGGRESSIVE: 4 } as const
    )[survey.goal];
    s += ({ LT3M: 1, M3TO12: 2, Y1TO3: 3, GT3Y: 4 } as const)[
      survey.horizon
    ];
    s += ({ LT5: 1, LT10: 2, LT20: 3, GT30: 4 } as const)[
      survey.lossTolerance
    ];
    s += (
      { NONE: 1, SAVING: 2, STOCK_ETF: 3, DERIV_CRYPTO: 4 } as const
    )[survey.experience];
    s += ({ LOW: 1, MID: 2, HIGH: 3 } as const)[survey.volatility];
    return s;
  }, [survey]);

  const surveyLabel = useMemo(() => {
    if (surveyScore <= 8) return '안정형';
    if (surveyScore <= 11) return '안정추구형';
    if (surveyScore <= 14) return '위험중립형';
    if (surveyScore <= 17) return '적극투자형';
    return '공격투자형';
  }, [surveyScore]);

  const setField = <K extends keyof BasicForm>(
    key: K,
    value: BasicForm[K],
  ) => {
    setBasicForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const markTouched = <K extends keyof BasicForm>(key: K) => {
    setTouched((prev) => ({
      ...prev,
      [key]: true,
    }));
  };

  const markAllTouched = () => {
    (Object.keys(basicForm) as (keyof BasicForm)[]).forEach((key) =>
      markTouched(key),
    );
  };

  const onNext = () => {
    if (!canGoStep2) {
      markAllTouched();
      return;
    }
    setStep(2);
  };

  const onPrev = () => setStep(1);

  const onSubmit = () => {
    console.log('[basicForm]', basicForm);
    console.log('[survey]', survey, { surveyScore, surveyLabel });

    alert(
      `가입 완료(데모)\n\n투자성향: ${surveyLabel} (score: ${surveyScore})`,
    );
    router.push('/');
  };

  return (
    <main className="min-h-[calc(100vh-64px)] bg-gradient-to-b from-sky-50 via-sky-30 to-white px-4 py-10 flex items-center justify-center animate-slide-up">
      <section className="w-full max-w-[620px] rounded-2xl border border-slate-200/70 bg-white p-8 shadow-sm">
        <div className="mb-4">
          <h1 className="text-xl font-extrabold text-slate-900">
            회원가입{' '}
            <span className="text-slate-500 text-sm font-semibold">
              {step === 1 ? '1/2' : '2/2'}
            </span>
          </h1>
          <p className="mt-1 text-xs text-slate-500">
            기본 정보 입력 후 투자성향 설문을 진행합니다.
          </p>
        </div>

        {step === 1 ? (
          <SignupForm
            value={basicForm}
            touched={touched}
            errors={basicErrors}
            pwRules={pwRules}
            onChange={setField}
            onBlur={markTouched}
            onBack={() => router.back()}
            onNext={onNext}
            nextDisabled={!canGoStep2}
          />
        ) : (
          <Survey
            value={survey}
            onChange={setSurvey}
            score={surveyScore}
            label={surveyLabel}
            onPrev={onPrev}
            onSubmit={onSubmit}
          />
        )}

        <div className="mt-5 flex justify-center gap-2">
          {[1, 2].map((n) => (
            <span
              key={n}
              className={[
                'h-2.5 w-2.5 rounded-full border transition',
                step === n
                  ? 'border-blue-800 bg-blue-800 opacity-100'
                  : 'border-slate-300 bg-transparent opacity-40',
              ].join(' ')}
            />
          ))}
        </div>
      </section>
    </main>
  );
};

export default SignupPage;
