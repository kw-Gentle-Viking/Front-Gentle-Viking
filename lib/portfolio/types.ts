export type SignalDecision = "관망" | "매수" | "매도";

export type AISignalCard = {
  id: string;
  datetime: string;
  stockCode: string;
  stockName: string;
  signal: "매수" | "매도";
  qty: number;
  volume: number;
  riskLevel: number;
  strategy: string;
  prevAssetKRW: number;
  finalAssetKRW: number;
  pnlKRW: number;
  pnlRate: number;
  decision: SignalDecision;
  decisionReason: string;
};
