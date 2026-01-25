import type { NewsItem, AssetSummary, Trade, Candle } from './types';

export const mockNews: NewsItem = {
  id: 'news-1',
  title: '오늘의 주요 시장 이슈: 변동성 확대 구간',
  summary:
    '지수 변동성이 커진 상황에서 섹터별 수급이 갈리는 흐름입니다.',
  source: 'Gentle Viking',
  publishedAt: '2026-01-25 09:10',
  tag: 'Market',
};

export const mockAssets: AssetSummary = {
  totalKRW: 12850000,
  cashKRW: 2150000,
  stockKRW: 10700000,
  pnlKRW: 325000,
  pnlRate: 0.0259,
};

export const mockTrades: Trade[] = [
  {
    id: 't1',
    time: '01/25 09:05',
    symbol: '005930',
    name: '삼성전자',
    action: 'BUY',
    qty: 2,
    price: 73500,
    reason: '추세 돌파',
  },
  {
    id: 't2',
    time: '01/25 10:20',
    symbol: '000660',
    name: 'SK하이닉스',
    action: 'SELL',
    qty: 1,
    price: 142000,
    reason: '리스크 관리',
  },
  {
    id: 't3',
    time: '01/25 11:40',
    symbol: '035420',
    name: '네이버',
    action: 'BUY',
    qty: 1,
    price: 56500,
    reason: 'AI 시그널',
  },
];

export const mockCandles: Candle[] = [
  { t: '09:00', o: 100, h: 108, l: 98, c: 105 },
  { t: '09:05', o: 105, h: 110, l: 103, c: 108 },
  { t: '09:10', o: 108, h: 112, l: 107, c: 109 },
  { t: '09:15', o: 109, h: 115, l: 108, c: 114 },
  { t: '09:20', o: 114, h: 116, l: 111, c: 112 },
  { t: '09:25', o: 112, h: 118, l: 112, c: 117 },
];
