import type {
  AccountAssets,
  Order,
  AITrade,
  MonthlyProfit,
  StockPnl,
  DividendItem,
} from "./types";

export const mockAccountAssets: AccountAssets = {
  broker: "한국투자증권",
  accountNo: "001-012-123123",
  totalKRW: 1397380,
  orderableKRW: 86539,
  cashKRW: 38,
  investedKRW: 1310797,
  investedPnlKRW: -22028,
  investedPnlRate: -1.65,
  holdings: [
    { flag: "🇰🇷", label: "국내주식", valueKRW: 30700, pnlKRW: -400, pnlRate: -1.28 },
  ],
  monthly: { totalKRW: 2977, saleKRW: 0, dividendKRW: 2977, interestKRW: 0 },
};

export const mockOrders: Order[] = [
  { id: "o1", datetime: "2026-05-19 09:05", stockName: "삼성전자",       stockCode: "005930", type: "매수", orderQty: 10, orderPrice: 74000,  filledQty: 10, filledPrice: 73800,  status: "체결" },
  { id: "o2", datetime: "2026-05-19 09:32", stockName: "SK하이닉스",     stockCode: "000660", type: "매도", orderQty: 5,  orderPrice: 143000, filledQty: 5,  filledPrice: 143200, status: "체결" },
  { id: "o3", datetime: "2026-05-18 14:11", stockName: "카카오",         stockCode: "035720", type: "매수", orderQty: 3,  orderPrice: 41000,  filledQty: 0,  filledPrice: 0,      status: "취소" },
  { id: "o4", datetime: "2026-05-18 10:47", stockName: "네이버",         stockCode: "035420", type: "매수", orderQty: 2,  orderPrice: 57000,  filledQty: 2,  filledPrice: 56900,  status: "체결" },
  { id: "o5", datetime: "2026-05-17 11:20", stockName: "현대차",         stockCode: "005380", type: "매도", orderQty: 4,  orderPrice: 215000, filledQty: 4,  filledPrice: 215500, status: "체결" },
  { id: "o6", datetime: "2026-05-16 09:58", stockName: "LG에너지솔루션", stockCode: "373220", type: "매수", orderQty: 1,  orderPrice: 380000, filledQty: 0,  filledPrice: 0,      status: "미체결" },
  { id: "o7", datetime: "2026-05-15 15:03", stockName: "삼성전자",       stockCode: "005930", type: "매도", orderQty: 5,  orderPrice: 75000,  filledQty: 5,  filledPrice: 74900,  status: "체결" },
];

export const mockAITrades: AITrade[] = [
  { id: "ai1", datetime: "2026-05-19 09:05", stockName: "삼성전자",       stockCode: "005930", action: "매수", qty: 2, price: 73500,  reason: "RSI 과매도 + 거래량 급증 감지" },
  { id: "ai2", datetime: "2026-05-19 10:20", stockName: "SK하이닉스",     stockCode: "000660", action: "매도", qty: 1, price: 143200, reason: "목표 수익률 도달 (5%), 리스크 관리",         pnlKRW: 6800,  pnlRate: 5.0 },
  { id: "ai3", datetime: "2026-05-18 11:40", stockName: "네이버",         stockCode: "035420", action: "매수", qty: 1, price: 56500,  reason: "AI 시그널: 단기 추세 상향 돌파" },
  { id: "ai4", datetime: "2026-05-17 14:03", stockName: "카카오",         stockCode: "035720", action: "매도", qty: 2, price: 40200,  reason: "손절 기준 -3% 도달, 추가 하락 위험",        pnlKRW: -2400, pnlRate: -2.9 },
  { id: "ai5", datetime: "2026-05-16 09:31", stockName: "현대차",         stockCode: "005380", action: "매수", qty: 1, price: 212000, reason: "뉴스 센티멘트 긍정 + MACD 골든크로스" },
  { id: "ai6", datetime: "2026-05-15 13:55", stockName: "삼성전자",       stockCode: "005930", action: "매도", qty: 2, price: 74900,  reason: "목표 수익률 도달 (1.9%), 변동성 상승 감지", pnlKRW: 2800,  pnlRate: 1.9 },
  { id: "ai7", datetime: "2026-05-14 10:12", stockName: "LG에너지솔루션", stockCode: "373220", action: "매수", qty: 1, price: 375000, reason: "섹터 모멘텀 상승, 기관 순매수 포착" },
];

export const mockMonthly: MonthlyProfit[] = [
  { month: "2026-01", saleKRW: 0,     dividendKRW: 0,    interestKRW: 0 },
  { month: "2026-02", saleKRW: 12400, dividendKRW: 0,    interestKRW: 120 },
  { month: "2026-03", saleKRW: 0,     dividendKRW: 2977, interestKRW: 0 },
  { month: "2026-04", saleKRW: -8600, dividendKRW: 0,    interestKRW: 85 },
  { month: "2026-05", saleKRW: 9200,  dividendKRW: 0,    interestKRW: 0 },
];

export const mockStockPnl: StockPnl[] = [
  { stockName: "SK하이닉스", stockCode: "000660", pnlKRW: 6800,  pnlRate: 5.0 },
  { stockName: "삼성전자",   stockCode: "005930", pnlKRW: 2800,  pnlRate: 1.9 },
  { stockName: "현대차",     stockCode: "005380", pnlKRW: -1200, pnlRate: -0.6 },
  { stockName: "카카오",     stockCode: "035720", pnlKRW: -2400, pnlRate: -2.9 },
];

export const mockDividends: DividendItem[] = [
  { stockName: "삼성전자",   stockCode: "005930", paidAt: "2026-03-18", amountKRW: 1820 },
  { stockName: "SK하이닉스", stockCode: "000660", paidAt: "2026-03-20", amountKRW: 757 },
  { stockName: "현대차",     stockCode: "005380", paidAt: "2026-02-14", amountKRW: 400 },
];
