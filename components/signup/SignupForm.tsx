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
}: {
  value: BasicForm;
  touched: Record<keyof BasicForm, boolean>;
  errors: Partial<Record<keyof BasicForm, string>>;
  pwRules: PwRules;
  onChange: <K extends keyof BasicForm>(
    key: K,
    v: BasicForm[K]
  ) => void;
  onBlur: (key: keyof BasicForm) => void;
  onBack: () => void;
  onNext: () => void;
  nextDisabled: boolean;
}) {
  return (
    <div className="space-y-4">
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

      <Field label="이메일" required>
        <div className="flex gap-2">
          <Input
            className="flex-1"
            value={value.email}
            onChange={(e) => onChange('email', e.target.value)}
            onBlur={() => onBlur('email')}
            placeholder="example@email.com"
          />
          <button
            type="button"
            disabled
            title="API 적용 후 활성화 예정"
            className="whitespace-nowrap rounded-xl border border-gray-200 px-3 py-2 text-sm text-gray-400"
          >
            중복체크(추후)
          </button>
        </div>
        {touched.email && errors.email && (
          <ErrorText text={errors.email} />
        )}
      </Field>

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
        <p className="mt-1 text-[11px] text-gray-500">
          ** 데모는 숫자만 10~11자 검증합니다.
        </p>
      </Field>

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

      <div className="rounded-xl border border-gray-200 p-3">
        <div className="text-sm font-extrabold">
          투자 관련 필수 동의
        </div>

        <div className="mt-2 max-h-40 overflow-auto whitespace-pre-wrap rounded-lg border border-gray-100 bg-gray-50 p-3 text-xs leading-5 text-gray-700">
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
            className="h-4 w-4"
          />
          <span className="text-sm">
            [필수] 위 내용을 읽고 동의합니다.
          </span>
        </label>

        {touched.consetRequired && errors.consetRequired && (
          <ErrorText text={errors.consetRequired} />
        )}
      </div>

      <div className="mt-4 flex gap-2">
        <button
          type="button"
          onClick={onBack}
          className="flex-1 rounded-xl border border-gray-200 px-4 py-3 text-sm font-bold text-gray-700 hover:bg-gray-50"
        >
          뒤로
        </button>
        <button
          type="button"
          onClick={onNext}
          disabled={nextDisabled}
          className={[
            'flex-1 rounded-xl px-4 py-3 text-sm font-extrabold',
            nextDisabled
              ? 'cursor-not-allowed bg-gray-200 text-gray-500'
              : 'bg-black text-white hover:opacity-90',
          ].join(' ')}
        >
          다음
        </button>
      </div>
    </div>
  );
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
      <div className="mb-1 text-sm font-extrabold">
        {label}{' '}
        {required ? <span className="text-gray-400">*</span> : null}
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
        'w-full rounded-xl border border-gray-200 px-3 py-2 text-sm outline-none',
        'focus:border-gray-400',
        className,
      ].join(' ')}
    />
  );
}

function ErrorText({ text }: { text: string }) {
  return (
    <p className="mt-1 text-xs font-semibold text-red-500">{text}</p>
  );
}

function Rule({ ok, text }: { ok: boolean; text: string }) {
  return (
    <div className="flex items-center gap-2">
      <span className={ok ? 'text-white' : 'text-red-600'}>
        {text}
      </span>
    </div>
  );
}
