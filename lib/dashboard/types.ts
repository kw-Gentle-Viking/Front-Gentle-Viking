export type MarketIndex = {
  id: number;
  name: string;
  value: number;
  change: number;
  changePercent: number;
  isUp: boolean;
};

export type StockItem = {
  id: number;
  rank: number | "-";
  name: string;
  stockCode: string;
  priceKRW: number;
  changePercent: number;
  isUp: boolean;
  volumeKRW: number;
};
