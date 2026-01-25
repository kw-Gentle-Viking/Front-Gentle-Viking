// 뉴스카드 타입
export type NewsItem = {
  id: string;
  title: string;
  summary: string;
  source?: string;
  publishedAt?: string;
  tag?: string;
};

// 자산 요약 타입
export type AssetSummary = {
  totalKRW: number; // 총평가금액
  cashKRW: number; // 예수금 (현금)
  stockKRW: number; // 주식 평가금액
  pnlKRW: number; // 손익
  pnlRate: number; // 손익률
};

// 자동거래 내역
export type Trade = {
  id: string;
  time: string;
  symbol: string; // 종목 코드
  name: string; // 종목명
  action: 'BUY' | 'SELL';
  qty: number;
  price: number;
  reason?: string; // 거래 사유 (자동거래인 경우)
};

export type Candle = {
  t: string;
  o: number; // open
  h: number; // high
  l: number; // low
  c: number; // close
  v?: number; // volume
};
