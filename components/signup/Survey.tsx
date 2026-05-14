'use client';

import { RiskProfile } from '@/lib/signup/types';

export default function Survey({
  value,
  onChange,
  score,
  label,
  onPrev,
  onSubmit,
  isSubmitting = false,
}: {
  value: RiskProfile;
  onChange: (next: RiskProfile) => void;
  score: number;
  label: string;
  onPrev: () => void;
  onSubmit: () => void;
  isSubmitting?: boolean;
}) {
  return (
    <div className="space-y-4">
      <Question title="1) 투자 목적">
        <RadioRow
          name="goal"
          value={value.goal}
          onChange={(v) => onChange({ ...value, goal: v })}
          options={[
            ['PRESERVE', '원금 보존'],
            ['STABLE', '안정적 수익'],
            ['GROWTH', '수익 추구'],
            ['AGGRESSIVE', '고수익 추구'],
          ]}
        />
      </Question>

      <Question title="2) 투자 기간">
        <RadioRow
          name="horizon"
          value={value.horizon}
          onChange={(v) => onChange({ ...value, horizon: v })}
          options={[
            ['LT3M', '3개월 미만'],
            ['M3TO12', '3~12개월'],
            ['Y1TO3', '1~3년'],
            ['GT3Y', '3년 이상'],
          ]}
        />
      </Question>

      <Question title="3) 손실 감내 수준">
        <RadioRow
          name="lossTolerance"
          value={value.lossTolerance}
          onChange={(v) => onChange({ ...value, lossTolerance: v })}
          options={[
            ['LT5', '-5%만 돼도 불안'],
            ['LT10', '-10%까지 가능'],
            ['LT20', '-20%까지 가능'],
            ['GT30', '-30% 이상도 가능'],
          ]}
        />
      </Question>

      <Question title="4) 투자 경험">
        <RadioRow
          name="experience"
          value={value.experience}
          onChange={(v) => onChange({ ...value, experience: v })}
          options={[
            ['NONE', '경험 없음'],
            ['SAVING', '예·적금 위주'],
            ['STOCK_ETF', '주식·ETF'],
            ['DERIV_CRYPTO', '파생/코인 포함'],
          ]}
        />
      </Question>

      <Question title="5) 변동성 선호">
        <RadioRow
          name="volatility"
          value={value.volatility}
          onChange={(v) => onChange({ ...value, volatility: v })}
          options={[
            ['LOW', '낮은 변동성 선호'],
            ['MID', '중간'],
            ['HIGH', '높은 변동성 선호'],
          ]}
        />
      </Question>

      <div className="rounded-2xl border border-indigo-100 bg-indigo-50/70 p-4 shadow-sm">
        <div className="text-sm font-extrabold text-slate-900">
          예상 투자성향
        </div>
        <div className="mt-1 text-sm">
          <span className="font-extrabold text-indigo-700">
            {label}
          </span>{' '}
          <span className="text-slate-500">(score: {score})</span>
        </div>
      </div>

      <div className="flex gap-3">
        <button
          type="button"
          onClick={onPrev}
          className="flex-1 rounded-2xl border border-slate-200 bg-white/80 px-4 py-3 text-sm font-bold text-slate-700 transition hover:bg-white"
        >
          이전
        </button>
        <button
          type="button"
          onClick={onSubmit}
          disabled={isSubmitting}
          className="flex-1 rounded-2xl bg-gradient-to-r from-indigo-600 via-violet-600 to-sky-500 px-4 py-3 text-sm font-extrabold text-white shadow-[0_12px_30px_rgba(79,70,229,0.18)] transition hover:scale-[1.01] disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {isSubmitting ? '가입 중...' : '가입 완료'}
        </button>
      </div>
    </div>
  );
}

function Question({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-slate-200/70 bg-white/76 p-4 shadow-sm">
      <div className="mb-2 text-sm font-extrabold text-slate-900">
        {title}
      </div>
      {children}
    </section>
  );
}

function RadioRow<T extends string>({
  name,
  value,
  onChange,
  options,
}: {
  name: string;
  value: T;
  onChange: (v: T) => void;
  options: Array<[T, string]>;
}) {
  return (
    <div className="space-y-2">
      {options.map(([v, label]) => (
        <label
          key={v}
          className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-white/78 px-3 py-3 transition hover:border-indigo-200 hover:bg-indigo-50"
        >
          <input
            type="radio"
            name={name}
            checked={value === v}
            onChange={() => onChange(v)}
            className="h-4 w-4 border-slate-300 text-indigo-600 focus:ring-indigo-500/20"
          />
          <span className="text-sm text-slate-700">{label}</span>
        </label>
      ))}
    </div>
  );
}
