'use client';

import { BasicForm } from '@/lib/signup/types';
import { REQUIRED_CONSENT_TEXT } from '@/lib/signup/consent';

type PwRules = {
  lengthOk: boolean;
  hasLetter: boolean;
  hasNumber: boolean;
  noSpace: boolean;
};

export default function SignupForm({
  value,
  touched,
  errors,
  pwRules,
  onChange,
  onBlur,
  onBack,
  onNext,
  nextDisabled,
  emailChecked,
  emailIsAlreadyRegistered,
  onCheckEmail,
}: {
  value: BasicForm;
  touched: Record<keyof BasicForm, boolean>;
  errors: Partial<Record<keyof BasicForm, string>>;
  pwRules: PwRules;
  onChange: <K extends keyof BasicForm>(
    key: K,
    v: BasicForm[K],
  ) => void;
  onBlur: (key: keyof BasicForm) => void;
  onBack: () => void;
  onNext: () => void;
  nextDisabled: boolean;
  emailChecked: boolean;
  emailIsAlreadyRegistered: boolean;
  onCheckEmail: () => void;
}) {
  const nameDone = Boolean(value.name.trim()) && !errors.name;
  const nicknameDone =
    nameDone && Boolean(value.nickname.trim()) && !errors.nickname;
  const emailDone =
    nicknameDone &&
    Boolean(value.email.trim()) &&
    emailChecked &&
    !emailIsAlreadyRegistered &&
    !errors.email;
  const phoneDone =
    emailDone && Boolean(value.phone.trim()) && !errors.phone;
  const passwordDone =
    phoneDone &&
    Boolean(value.pw1) &&
    pwRules.lengthOk &&
    pwRules.hasLetter &&
    pwRules.hasNumber &&
    pwRules.noSpace &&
    !errors.pw1;
  const passwordConfirmDone =
    passwordDone && Boolean(value.pw2) && value.pw2 === value.pw1 && !errors.pw2;
  const birthdateDone =
    passwordConfirmDone && Boolean(value.birthdate) && !errors.birthdate;

  return (
    <div className="space-y-5">
      <Field label="이름" required>
        <Input
          value={value.name}
          onChange={(e) => onChange('name', e.target.value)}
          onBlur={() => onBlur('name')}
          placeholder="홍길동"
        />
        {touched.name && errors.name && (
          <ErrorText text={errors.name} />
        )}
      </Field>

      {nameDone && (
        <StepIn>
          <Field label="닉네임" required>
            <Input
              value={value.nickname}
              onChange={(e) => onChange('nickname', e.target.value)}
              onBlur={() => onBlur('nickname')}
              placeholder="닉네임"
            />
            {touched.nickname && errors.nickname && (
              <ErrorText text={errors.nickname} />
            )}
          </Field>
        </StepIn>
      )}

      {nicknameDone && (
        <StepIn>
          <Field label="이메일" required>
            <div className="flex flex-col gap-2">
              <Input
                value={value.email}
                onChange={(e) => onChange('email', e.target.value)}
                onBlur={() => onBlur('email')}
                placeholder="example@email.com"
              />
              <button
                type="button"
                onClick={onCheckEmail}
                className={[
                  'w-full whitespace-nowrap rounded-2xl border px-4 py-3 text-sm font-black transition',
                  emailChecked
                    ? 'border-emerald-200 bg-emerald-50 text-emerald-700'
                    : 'border-slate-200 bg-white/80 text-slate-600 hover:border-indigo-200 hover:bg-indigo-50',
                ].join(' ')}
              >
                {emailChecked ? '사용 가능' : '중복체크'}
              </button>
            </div>
            {touched.email && errors.email && (
              <ErrorText text={errors.email} />
            )}
            {emailIsAlreadyRegistered && (
              <p className="mt-1 text-xs font-semibold text-rose-600">
                이미 가입된 이메일입니다. 로그인 화면에서 이용해주세요.
              </p>
            )}
            {emailChecked && !emailIsAlreadyRegistered && (
              <p className="mt-1 text-xs font-semibold text-emerald-700">
                사용할 수 있는 이메일입니다.
              </p>
            )}
          </Field>
        </StepIn>
      )}

      {emailDone && (
        <StepIn>
          <Field label="휴대폰 번호" required>
          <Input
            value={value.phone}
            onChange={(e) => onChange('phone', e.target.value)}
            onBlur={() => onBlur('phone')}
            placeholder="01012345678"
          />
          {touched.phone && errors.phone && (
            <ErrorText text={errors.phone} />
          )}
          <p className="mt-2 text-[11px] font-medium text-slate-400">
            ** 데모는 숫자만 10~11자 검증합니다.
          </p>
        </Field>
        </StepIn>
      )}

      {phoneDone && (
        <StepIn>
          <Field label="비밀번호" required>
          <Input
            type="password"
            value={value.pw1}
            onChange={(e) => onChange('pw1', e.target.value)}
            onBlur={() => onBlur('pw1')}
            placeholder="8~20자, 영문+숫자"
          />

          <div className="mt-2 space-y-1 text-xs">
            <Rule
              ok={
                pwRules.lengthOk &&
                pwRules.hasLetter &&
                pwRules.hasNumber &&
                pwRules.noSpace
              }
              text="영문+숫자 포함 8~20자"
            />
          </div>

          {touched.pw1 && errors.pw1 && <ErrorText text={errors.pw1} />}
        </Field>
        </StepIn>
      )}

      {passwordDone && (
        <StepIn>
          <Field label="비밀번호 재확인" required>
            <Input
              type="password"
              value={value.pw2}
              onChange={(e) => onChange('pw2', e.target.value)}
              onBlur={() => onBlur('pw2')}
              placeholder="비밀번호를 다시 입력"
            />
            {touched.pw2 && errors.pw2 && <ErrorText text={errors.pw2} />}
          </Field>
        </StepIn>
      )}

      {passwordConfirmDone && (
        <StepIn>
          <Field label="생년월일" required>
            <Input
              type="date"
              value={value.birthdate}
              onChange={(e) => onChange('birthdate', e.target.value)}
              onBlur={() => onBlur('birthdate')}
            />
            {touched.birthdate && errors.birthdate && (
              <ErrorText text={errors.birthdate} />
            )}
          </Field>
        </StepIn>
      )}

      {birthdateDone && (
        <StepIn>
          <div className="rounded-2xl border border-slate-200/70 bg-white/72 p-4 shadow-sm">
        <div className="text-sm font-extrabold text-slate-900">
          투자 관련 필수 동의
        </div>

        <div className="mt-3 max-h-40 overflow-auto whitespace-pre-wrap rounded-2xl border border-slate-200 bg-slate-50/90 p-4 text-xs leading-5 text-slate-600">
          {REQUIRED_CONSENT_TEXT}
        </div>

        <label className="mt-3 flex items-center gap-2">
          <input
            type="checkbox"
            checked={value.consetRequired}
            onChange={(e) =>
              onChange('consetRequired', e.target.checked)
            }
            onBlur={() => onBlur('consetRequired')}
            className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500/20"
          />
          <span className="text-sm text-slate-700">
            [필수] 위 내용을 읽고 동의합니다.
          </span>
        </label>

        {touched.consetRequired && errors.consetRequired && (
          <ErrorText text={errors.consetRequired} />
        )}
      </div>
        </StepIn>
      )}

      <div className="mt-6 flex gap-3">
        <button
          type="button"
          onClick={onBack}
          className="flex-1 rounded-2xl border border-slate-200 bg-white/80 px-4 py-3 text-sm font-bold text-slate-700 transition hover:bg-white"
        >
          뒤로
        </button>
        <button
          type="button"
          onClick={onNext}
          disabled={nextDisabled}
          className={[
            'flex-1 rounded-2xl px-4 py-3 text-sm font-extrabold shadow-sm transition',
            nextDisabled
              ? 'cursor-not-allowed bg-slate-200 text-slate-500'
              : 'bg-gradient-to-r from-indigo-600 via-violet-600 to-sky-500 text-white shadow-[0_12px_30px_rgba(79,70,229,0.18)] hover:scale-[1.01]',
          ].join(' ')}
        >
          다음
        </button>
      </div>
    </div>
  );
}

function StepIn({ children }: { children: React.ReactNode }) {
  return <div className="animate-slide-up">{children}</div>;
}

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="mb-2 text-sm font-extrabold text-slate-900">
        {label}{' '}
        {required ? <span className="text-slate-400">*</span> : null}
      </div>
      {children}
    </div>
  );
}

function Input({
  className = '',
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & {
  className?: string;
}) {
  return (
    <input
      {...props}
      className={[
        'w-full rounded-2xl border border-slate-200 bg-white/80 px-4 py-3 text-sm font-semibold text-slate-900 outline-none',
        'placeholder:text-slate-400 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-500/10',
        className,
      ].join(' ')}
    />
  );
}

function ErrorText({ text }: { text: string }) {
  return (
    <p className="mt-1 text-xs font-semibold text-rose-600">{text}</p>
  );
}

function Rule({ ok, text }: { ok: boolean; text: string }) {
  return (
    <div className="flex items-center gap-2">
      <span className={ok ? 'text-emerald-700' : 'text-rose-700'}>
        {text}
      </span>
    </div>
  );
}
