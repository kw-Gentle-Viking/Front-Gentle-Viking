export type InvestmentTendency =
  | "안정형"
  | "안정추구형"
  | "위험중립형"
  | "적극투자형"
  | "공격투자형";

export type NewsSentiment = "긍정" | "부정";

export type NewsItem = {
  sentiment: NewsSentiment;
  summary: string;
  source?: string;
  date?: string;
};

export type StockReport = {
  id: number;
  stockName: string;
  stockCode: string;
  priceKRW: number;
  changePercent: number;
  isUp: boolean;
  score: number;
  shortSummary: string;
  fullSummary: string;
  news: NewsItem[];
};
