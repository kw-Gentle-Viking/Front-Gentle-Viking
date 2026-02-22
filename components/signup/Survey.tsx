'use client';

import { RiskProfile } from '@/lib/signup/types';

export default function Survey({
  value,
  onChange,
  score,
  label,
  onPrev,
  onSubmit,
}: {
  value: RiskProfile;
  onChange: (next: RiskProfile) => void;
  score: number;
  label: string;
  onPrev: () => void;
  onSubmit: () => void;
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

      <div className="rounded-2xl border border-slate-200/70 bg-white p-3 shadow-sm">
        <div className="text-sm font-extrabold text-slate-900">
          예상 투자성향
        </div>
        <div className="mt-1 text-sm">
          <span className="font-extrabold text-blue-800">
            {label}
          </span>{' '}
          <span className="text-slate-500">(score: {score})</span>
        </div>
      </div>

      <div className="flex gap-2">
        <button
          type="button"
          onClick={onPrev}
          className="flex-1 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-50"
        >
          이전
        </button>
        <button
          type="button"
          onClick={onSubmit}
          className="flex-1 rounded-2xl bg-blue-800 px-4 py-3 text-sm font-extrabold text-white shadow-sm transition hover:bg-blue-700 active:bg-blue-900"
        >
          가입 완료
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
    <section className="rounded-2xl border border-slate-200/70 bg-white p-4 shadow-sm">
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
          className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 transition hover:bg-sky-50"
        >
          <input
            type="radio"
            name={name}
            checked={value === v}
            onChange={() => onChange(v)}
            className="h-4 w-4 border-slate-300 text-blue-800 focus:ring-blue-800/20"
          />
          <span className="text-sm text-slate-700">{label}</span>
        </label>
      ))}
    </div>
  );
}
