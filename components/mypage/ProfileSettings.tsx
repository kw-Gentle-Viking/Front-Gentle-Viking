"use client";

import { useMemo, useState } from "react";
import type { RiskProfile } from "@/lib/signup/types";

/* ── 점수/등급 계산 (signup/page.tsx 동일 로직) ── */
function calcScore(s: RiskProfile): number {
  const goal = ({ PRESERVE: 1, STABLE: 2, GROWTH: 3, AGGRESSIVE: 4 } as const)[
    s.goal
  ];
  const period = ({ LT3M: 1, M3TO12: 2, Y1TO3: 3, GT3Y: 4 } as const)[
    s.horizon
  ];
  const tolerance = ({ LT5: 1, LT10: 2, LT20: 3, GT30: 4 } as const)[
    s.lossTolerance
  ];
  const experience = (
    { NONE: 1, SAVING: 2, STOCK_ETF: 3, DERIV_CRYPTO: 4 } as const
  )[s.experience];
  const volatility = ({ LOW: 1, MID: 2, HIGH: 3 } as const)[s.volatility];

  const weighted =
    ((goal - 1) / 3) * 100 * 0.2 +
    ((period - 1) / 3) * 100 * 0.1 +
    ((tolerance - 1) / 3) * 100 * 0.3 +
    ((experience - 1) / 3) * 100 * 0.15 +
    ((volatility - 1) / 2) * 100 * 0.25;

  let grade =
    weighted <= 20
      ? 1
      : weighted <= 40
        ? 2
        : weighted <= 60
          ? 3
          : weighted <= 80
            ? 4
            : 5;
  if (tolerance === 1) grade = Math.min(2, grade);
  return grade;
}

function calcLabel(score: number): string {
  if (score <= 1) return "안정형";
  if (score <= 2) return "안정추구형";
  if (score <= 3) return "위험중립형";
  if (score <= 4) return "적극투자형";
  return "공격투자형";
}

/* ── 공통 서브 컴포넌트 ── */
function SectionCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
      <div className="border-b border-gray-100 bg-gray-50/50 px-5 py-3.5">
        <h3 className="text-sm font-bold text-slate-900">{title}</h3>
      </div>
      <div className="px-5 py-5">{children}</div>
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
    <div className="rounded-xl border border-gray-100 bg-gray-50/60 p-4">
      <p className="mb-3 text-sm font-bold text-slate-800">{title}</p>
      {children}
    </div>
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
          className={`flex cursor-pointer items-center gap-2.5 rounded-xl border px-3 py-2.5 text-sm transition ${
            value === v
              ? "border-indigo-200 bg-indigo-50 text-indigo-700"
              : "border-gray-100 bg-white text-slate-600 hover:border-indigo-100 hover:bg-indigo-50/40"
          }`}
        >
          <input
            type="radio"
            name={name}
            checked={value === v}
            onChange={() => onChange(v)}
            className="h-4 w-4 border-slate-300 text-indigo-600 focus:ring-indigo-500/20"
          />
          {label}
        </label>
      ))}
    </div>
  );
}

/* ── 자동매매 활성화 모달 (위험성 동의) ── */
function EnableAutoTradeModal({ onClose, onConfirm }: { onClose: () => void; onConfirm: () => void }) {
  const [agreed, setAgreed] = useState(false);

  const RISKS = [
    "AI 알고리즘의 판단은 시장 상황에 따라 손실을 유발할 수 있습니다.",
    "자동매매 중 발생한 손익에 대한 책임은 전적으로 본인에게 있습니다.",
    "시스템 오류, 네트워크 지연 등 예상치 못한 상황으로 인한 손실이 발생할 수 있습니다.",
    "과거의 수익률이 미래의 수익을 보장하지 않습니다.",
    "자동매매는 언제든지 직접 중단할 수 있으나, 이미 체결된 거래는 취소되지 않습니다.",
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 backdrop-blur-sm"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="flex w-full max-w-md flex-col rounded-2xl bg-white shadow-2xl">
        {/* 헤더 */}
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
          <div>
            <h3 className="text-base font-semibold text-slate-900">AI 자동매매 활성화</h3>
            <p className="text-xs text-slate-400">활성화 전 아래 위험 고지를 확인해주세요.</p>
          </div>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-full text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
          >
            ✕
          </button>
        </div>

        {/* 위험 고지 */}
        <div className="px-6 py-5">
          <div className="rounded-xl border border-amber-200 bg-amber-50 p-4">
            <p className="mb-3 text-xs font-semibold text-amber-700">⚠ 위험 고지 사항</p>
            <ul className="space-y-2">
              {RISKS.map((r, i) => (
                <li key={i} className="flex gap-2 text-xs text-amber-800">
                  <span className="mt-0.5 shrink-0 text-amber-500">•</span>
                  {r}
                </li>
              ))}
            </ul>
          </div>

          <label className="mt-4 flex cursor-pointer items-start gap-3">
            <input
              type="checkbox"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              className="mt-0.5 h-4 w-4 shrink-0 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500/20"
            />
            <span className="text-xs leading-relaxed text-slate-600">
              위 위험 고지 사항을 모두 읽고 이해하였으며, 이에 동의하여 AI 자동매매를 활성화합니다.
            </span>
          </label>
        </div>

        {/* 푸터 */}
        <div className="flex gap-3 border-t border-slate-100 px-6 py-4">
          <button
            onClick={onClose}
            className="flex-1 rounded-xl border border-slate-200 py-3 text-sm font-medium text-slate-600 transition hover:bg-slate-50"
          >
            취소
          </button>
          <button
            onClick={onConfirm}
            disabled={!agreed}
            className="flex-1 rounded-xl py-3 text-sm font-semibold transition disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-400 bg-indigo-600 text-white hover:bg-indigo-500 disabled:hover:bg-slate-200"
          >
            활성화
          </button>
        </div>
      </div>
    </div>
  );
}

/* ── 자동매매 비활성화 확인 모달 ── */
function DisableAutoTradeModal({ onClose, onConfirm }: { onClose: () => void; onConfirm: () => void }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 backdrop-blur-sm"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="flex w-full max-w-sm flex-col rounded-2xl bg-white shadow-2xl">
        <div className="px-6 py-6 text-center">
          <p className="text-3xl">⏸</p>
          <h3 className="mt-3 text-base font-semibold text-slate-900">자동매매를 비활성화할까요?</h3>
          <p className="mt-2 text-xs leading-relaxed text-slate-400">
            비활성화하면 AI가 더 이상 자동으로 거래를 실행하지 않습니다.
            <br />이미 접수된 주문은 취소되지 않습니다.
          </p>
        </div>
        <div className="flex gap-3 border-t border-slate-100 px-6 py-4">
          <button
            onClick={onClose}
            className="flex-1 rounded-xl border border-slate-200 py-3 text-sm font-medium text-slate-600 transition hover:bg-slate-50"
          >
            유지
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 rounded-xl bg-slate-900 py-3 text-sm font-semibold text-white transition hover:bg-slate-700"
          >
            비활성화
          </button>
        </div>
      </div>
    </div>
  );
}

/* ── 자동매매 토글 카드 ── */
function AutoTradeToggle() {
  const [enabled, setEnabled] = useState(false);
  const [modal, setModal] = useState<"enable" | "disable" | null>(null);

  const handleToggleClick = () => setModal(enabled ? "disable" : "enable");

  return (
    <>
      <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-white px-5 py-4">
        <div>
          <p className="text-sm font-semibold text-slate-900">AI 자동매매</p>
          <p className="mt-0.5 text-xs text-slate-500">
            {enabled ? "현재 자동매매가 활성화되어 있습니다." : "자동매매가 비활성화되어 있습니다."}
          </p>
        </div>
        <button
          onClick={handleToggleClick}
          className={`relative inline-flex h-7 w-12 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 focus:outline-none ${
            enabled ? "bg-indigo-600" : "bg-slate-200"
          }`}
          role="switch"
          aria-checked={enabled}
        >
          <span
            className={`inline-block h-6 w-6 transform rounded-full bg-white shadow ring-0 transition-transform duration-200 ${
              enabled ? "translate-x-5" : "translate-x-0"
            }`}
          />
        </button>
      </div>

      {modal === "enable" && (
        <EnableAutoTradeModal
          onClose={() => setModal(null)}
          onConfirm={() => { setEnabled(true); setModal(null); }}
        />
      )}
      {modal === "disable" && (
        <DisableAutoTradeModal
          onClose={() => setModal(null)}
          onConfirm={() => { setEnabled(false); setModal(null); }}
        />
      )}
    </>
  );
}

/* ── 투자 성향 설문 모달 ── */
function SurveyModal({
  survey,
  onChange,
  onClose,
  onSave,
}: {
  survey: RiskProfile;
  onChange: (s: RiskProfile) => void;
  onClose: () => void;
  onSave: () => void;
}) {
  const score = useMemo(() => calcScore(survey), [survey]);
  const label = useMemo(() => calcLabel(score), [score]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 backdrop-blur-sm"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative flex max-h-[90vh] w-full max-w-lg flex-col rounded-2xl bg-white shadow-2xl">
        {/* 모달 헤더 */}
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
          <div>
            <h3 className="text-base font-semibold text-slate-900">
              투자 성향 변경
            </h3>
            <p className="text-xs text-slate-400">
              설문을 통해 투자 성향을 변경할 수 있습니다.
              <br />
              변경된 성향은 AI 리포트와 자동매매 전략에 반영됩니다.
            </p>
          </div>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-full text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
          >
            ✕
          </button>
        </div>

        {/* 모달 바디 (스크롤) */}
        <div className="flex-1 space-y-3 overflow-y-auto px-6 py-5">
          <Question title="1) 투자 목적">
            <RadioRow
              name="goal"
              value={survey.goal}
              onChange={(v) => onChange({ ...survey, goal: v })}
              options={[
                ["PRESERVE", "원금 보존"],
                ["STABLE", "안정적 수익"],
                ["GROWTH", "수익 추구"],
                ["AGGRESSIVE", "고수익 추구"],
              ]}
            />
          </Question>

          <Question title="2) 투자 기간">
            <RadioRow
              name="horizon"
              value={survey.horizon}
              onChange={(v) => onChange({ ...survey, horizon: v })}
              options={[
                ["LT3M", "3개월 미만"],
                ["M3TO12", "3~12개월"],
                ["Y1TO3", "1~3년"],
                ["GT3Y", "3년 이상"],
              ]}
            />
          </Question>

          <Question title="3) 손실 감내 수준">
            <RadioRow
              name="lossTolerance"
              value={survey.lossTolerance}
              onChange={(v) => onChange({ ...survey, lossTolerance: v })}
              options={[
                ["LT5", "-5%만 돼도 불안"],
                ["LT10", "-10%까지 가능"],
                ["LT20", "-20%까지 가능"],
                ["GT30", "-30% 이상도 가능"],
              ]}
            />
          </Question>

          <Question title="4) 투자 경험">
            <RadioRow
              name="experience"
              value={survey.experience}
              onChange={(v) => onChange({ ...survey, experience: v })}
              options={[
                ["NONE", "경험 없음"],
                ["SAVING", "예·적금 위주"],
                ["STOCK_ETF", "주식·ETF"],
                ["DERIV_CRYPTO", "파생/코인 포함"],
              ]}
            />
          </Question>

          <Question title="5) 변동성 선호">
            <RadioRow
              name="volatility"
              value={survey.volatility}
              onChange={(v) => onChange({ ...survey, volatility: v })}
              options={[
                ["LOW", "낮은 변동성 선호"],
                ["MID", "중간"],
                ["HIGH", "높은 변동성 선호"],
              ]}
            />
          </Question>

          {/* 예상 성향 */}
          <div className="rounded-xl border border-indigo-100 bg-indigo-50 px-4 py-3">
            <p className="text-xs text-indigo-400">예상 투자성향</p>
            <p className="mt-0.5 text-sm font-bold text-indigo-700">
              {label}{" "}
              <span className="font-normal text-indigo-400">
                (score: {score})
              </span>
            </p>
          </div>
        </div>

        {/* 모달 푸터 */}
        <div className="flex gap-3 border-t border-slate-100 px-6 py-4">
          <button
            onClick={onClose}
            className="flex-1 rounded-xl border border-slate-200 py-3 text-sm font-medium text-slate-600 transition hover:bg-slate-50"
          >
            취소
          </button>
          <button
            onClick={onSave}
            className="flex-1 rounded-xl bg-slate-900 py-3 text-sm font-semibold text-white transition hover:bg-slate-700"
          >
            저장
          </button>
        </div>
      </div>
    </div>
  );
}

/* ── 투자 성향 카드 ── */
function SurveySection() {
  const defaultSurvey: RiskProfile = {
    goal: "STABLE",
    horizon: "Y1TO3",
    lossTolerance: "LT10",
    experience: "STOCK_ETF",
    volatility: "MID",
  };

  const [saved, setSaved] = useState<RiskProfile>(defaultSurvey);
  const [draft, setDraft] = useState<RiskProfile>(defaultSurvey);
  const [open, setOpen] = useState(false);

  const score = useMemo(() => calcScore(saved), [saved]);
  const label = useMemo(() => calcLabel(score), [score]);

  const handleOpen = () => {
    setDraft(saved);
    setOpen(true);
  };

  const handleSave = () => {
    setSaved(draft);
    setOpen(false);
  };

  return (
    <>
      <SectionCard title="투자 성향">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold text-indigo-700">{label}</p>
            <p className="mt-0.5 text-xs text-slate-400">score: {score}</p>
          </div>
          <button
            onClick={handleOpen}
            className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
          >
            변경하기
          </button>
        </div>
      </SectionCard>

      {open && (
        <SurveyModal
          survey={draft}
          onChange={setDraft}
          onClose={() => setOpen(false)}
          onSave={handleSave}
        />
      )}
    </>
  );
}

type PwForm = { current: string; next: string; confirm: string };

const PW_FIELDS: { key: keyof PwForm; label: string; placeholder: string }[] = [
  { key: "current", label: "현재 비밀번호",   placeholder: "현재 비밀번호 입력" },
  { key: "next",    label: "새 비밀번호",     placeholder: "영문+숫자 포함 8~20자" },
  { key: "confirm", label: "새 비밀번호 확인", placeholder: "새 비밀번호 재입력" },
];

function pwValid(pw: string) {
  return pw.length >= 8 && pw.length <= 20 && /[A-Za-z]/.test(pw) && /[0-9]/.test(pw) && !/\s/.test(pw);
}

/* ── 비밀번호 변경 모달 ── */
function PasswordModal({ onClose, onSave }: { onClose: () => void; onSave: () => void }) {
  const [form, setForm] = useState<PwForm>({ current: "", next: "", confirm: "" });
  const [errors, setErrors] = useState<Partial<PwForm>>({});

  const validate = () => {
    const e: Partial<PwForm> = {};
    if (!form.current) e.current = "현재 비밀번호를 입력해주세요.";
    if (!form.next) e.next = "새 비밀번호를 입력해주세요.";
    else if (!pwValid(form.next)) e.next = "영문+숫자 포함 8~20자로 입력해주세요.";
    if (!form.confirm) e.confirm = "새 비밀번호를 한 번 더 입력해주세요.";
    else if (form.next !== form.confirm) e.confirm = "비밀번호가 일치하지 않습니다.";
    return e;
  };

  const handleSave = () => {
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length > 0) return;
    onSave();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 backdrop-blur-sm"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="relative flex w-full max-w-md flex-col rounded-2xl bg-white shadow-2xl">
        {/* 헤더 */}
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
          <div>
            <h3 className="text-base font-semibold text-slate-900">비밀번호 변경</h3>
            <p className="text-xs text-slate-400">영문+숫자 포함 8~20자, 공백 불가</p>
          </div>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-full text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
          >
            ✕
          </button>
        </div>

        {/* 바디 */}
        <div className="space-y-4 px-6 py-5">
          {PW_FIELDS.map(({ key, label, placeholder }) => (
            <div key={key}>
              <label className="mb-1.5 block text-xs font-medium text-slate-600">
                {label}
              </label>
              <input
                type="password"
                value={form[key]}
                placeholder={placeholder}
                onChange={(e) => {
                  setForm((p) => ({ ...p, [key]: e.target.value }));
                  setErrors((p) => ({ ...p, [key]: undefined }));
                }}
                className={`w-full rounded-xl border px-4 py-3 text-sm outline-none transition placeholder:text-slate-300 focus:ring-4 focus:ring-indigo-500/10 ${
                  errors[key]
                    ? "border-rose-300 focus:border-rose-400"
                    : "border-slate-200 focus:border-indigo-400"
                }`}
              />
              {errors[key] && (
                <p className="mt-1 text-xs text-rose-500">{errors[key]}</p>
              )}
            </div>
          ))}
        </div>

        {/* 푸터 */}
        <div className="flex gap-3 border-t border-slate-100 px-6 py-4">
          <button
            onClick={onClose}
            className="flex-1 rounded-xl border border-slate-200 py-3 text-sm font-medium text-slate-600 transition hover:bg-slate-50"
          >
            취소
          </button>
          <button
            onClick={handleSave}
            className="flex-1 rounded-xl bg-slate-900 py-3 text-sm font-semibold text-white transition hover:bg-slate-700"
          >
            변경
          </button>
        </div>
      </div>
    </div>
  );
}

/* ── 비밀번호 섹션 카드 ── */
function PasswordSection() {
  const [open, setOpen] = useState(false);
  const [changed, setChanged] = useState(false);

  const handleSave = () => {
    setOpen(false);
    setChanged(true);
    setTimeout(() => setChanged(false), 3000);
  };

  return (
    <>
      <SectionCard title="비밀번호">
        <div className="flex items-center justify-between">
          <p className="text-sm text-slate-500">
            {changed ? "비밀번호가 변경되었습니다." : "주기적으로 비밀번호를 변경해주세요."}
          </p>
          <button
            onClick={() => setOpen(true)}
            className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
          >
            변경하기
          </button>
        </div>
      </SectionCard>

      {open && (
        <PasswordModal onClose={() => setOpen(false)} onSave={handleSave} />
      )}
    </>
  );
}

/* ── 메인 컴포넌트 ── */
export default function ProfileSettings() {
  return (
    <div className="space-y-5">
      <h2 className="text-base font-semibold text-slate-900">내 정보 변경</h2>
      <AutoTradeToggle />
      <SurveySection />
      <PasswordSection />
    </div>
  );
}
