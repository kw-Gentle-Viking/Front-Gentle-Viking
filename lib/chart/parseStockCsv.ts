import Papa from 'papaparse';
import { CandleType } from './types';

// 날짜(YYYYMMDD), 시간(HHMMSS)을 unix seconds로 변환
function toUnixSeconds(dateYYYYMMDD: string, timeHHMMSS: string) {
  const y = Number(dateYYYYMMDD.slice(0, 4));
  const m = Number(dateYYYYMMDD.slice(4, 6));
  const d = Number(dateYYYYMMDD.slice(6, 8));

  const hh = Number(timeHHMMSS.slice(0, 2));
  const mm = Number(timeHHMMSS.slice(2, 4));
  const ss = Number(timeHHMMSS.slice(4, 6));

  const dt = new Date(y, m - 1, d, hh, mm, ss);
  return Math.floor(dt.getTime() / 1000);
}

// 숫자 변환(콤마 제거)
function num(v: unknown) {
  if (v === null || v === undefined) return NaN;
  const s = String(v).trim().replaceAll(',', '');
  return Number(s);
}

// null타입 제거
function isCandle(v: CandleType | null): v is CandleType {
  return v !== null;
}

// 중복 시간 병합
function mergeSameTime(candles: CandleType[]): CandleType[] {
  const out: CandleType[] = [];
  for (const c of candles) {
    const last = out[out.length - 1];

    if (last && last.time === c.time) {
      last.high = Math.max(last.high, c.high);
      last.low = Math.min(last.low, c.low);
      last.close = c.close;
      if (last.volume !== undefined || c.volume !== undefined) {
        last.volume = (last.volume ?? 0) + (c.volume ?? 0);
      }
      continue;
    }

    out.push({ ...c });
  }
  return out;
}

// public 폴더 csv파일 파싱작업
export async function loadCandlesFromCsv(
  csvPath: string,
): Promise<CandleType[]> {
  // CSV 파일 로드
  const res = await fetch(csvPath);
  if (!res.ok) throw new Error(`CSV fetch failed: ${res.status}`);

  // CSV 텍스트 파싱
  const text = await res.text();

  // PapaParse로 CSV 파싱
  const parsed = Papa.parse<Record<string, unknown>>(text, {
    header: true,
    skipEmptyLines: true,
  });

  const rows = parsed.data ?? [];

  // rows를 CandleType 배열로 변환
  const mapped: Array<CandleType | null> = rows.map(
    (r: Record<string, unknown>) => {
      const date = String(r['stck_bsop_date'] ?? '').trim();
      const time = String(r['stck_cntg_hour'] ?? '').trim();

      const open = num(r['stck_oprc']);
      const high = num(r['stck_hgpr']);
      const low = num(r['stck_lwpr']);
      const close = num(r['stck_prpr']);

      const volumeVal = num(r['cntg_vol']);
      const volume = Number.isFinite(volumeVal)
        ? volumeVal
        : undefined;

      if (!date || !time) return null;
      if (![open, high, low, close].every(Number.isFinite))
        return null;

      return {
        time: toUnixSeconds(date, time),
        open,
        high,
        low,
        close,
        volume,
      } satisfies CandleType;
    },
  );

  const candles: CandleType[] = mapped
    .filter(isCandle)
    .sort((a, b) => a.time - b.time);

  return mergeSameTime(candles);
}
