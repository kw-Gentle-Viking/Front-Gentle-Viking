export type AITradeAction = "매수" | "매도";

export type AITrade = {
  id: string;
  datetime: string;
  stockName: string;
  stockCode: string;
  action: AITradeAction;
  qty: number;
  price: number;
  reason: string;
  pnlKRW?: number;
  pnlRate?: number;
};
