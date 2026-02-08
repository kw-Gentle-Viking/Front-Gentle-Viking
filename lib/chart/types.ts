// 캔들타입 기본 정의 - csv 행 이름
export type CandleType = {
  time: number; //  시간 - stck_bsop_date + stck_cntg_hour
  open: number; // 시가 - stck_oprc
  high: number; // 고가 - stck_hgpr
  low: number; // 저가 - stck_lwpr
  close: number; // 종가 - stck_prpr
  volume?: number; // 거래량 - cntg_vol
};
