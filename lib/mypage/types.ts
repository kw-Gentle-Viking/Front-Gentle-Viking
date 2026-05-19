export type OrderStatus = "체결" | "취소" | "미체결";
export type OrderType = "매수" | "매도";
export type AITradeAction = "매수" | "매도";

export type StockHolding = {
  flag: string;
  label: string;
  valueKRW: number;
  pnlKRW: number;
  pnlRate: number;
};

export type MonthlyReturn = {
  totalKRW: number;
  saleKRW: number;
  dividendKRW: number;
  interestKRW: number;
};

export type AccountAssets = {
  broker: string;
  accountNo: string;
  totalKRW: number;
  orderableKRW: number;
  cashKRW: number;
  investedKRW: number;
  investedPnlKRW: number;
  investedPnlRate: number;
  holdings: StockHolding[];
  monthly: MonthlyReturn;
};

export type Order = {
  id: string;
  datetime: string;
  stockName: string;
  stockCode: string;
  type: OrderType;
  orderQty: number;
  orderPrice: number;
  filledQty: number;
  filledPrice: number;
  status: OrderStatus;
};

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

export type MonthlyProfit = {
  month: string;
  saleKRW: number;
  dividendKRW: number;
  interestKRW: number;
};

export type StockPnl = {
  stockName: string;
  stockCode: string;
  pnlKRW: number;
  pnlRate: number;
};

export type DividendItem = {
  stockName: string;
  stockCode: string;
  paidAt: string;
  amountKRW: number;
};
