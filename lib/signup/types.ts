export type BasicForm = {
  name: string;
  email: string;
  pw1: string;
  pw2: string;
  nickname: string;
  birthdate: string;
  phone: string;
  consetRequired: boolean;
};

export type RiskProfile = {
  goal: 'PRESERVE' | 'STABLE' | 'GROWTH' | 'AGGRESSIVE';
  horizon: 'LT3M' | 'M3TO12' | 'Y1TO3' | 'GT3Y';
  lossTolerance: 'LT5' | 'LT10' | 'LT20' | 'GT30';
  experience: 'NONE' | 'SAVING' | 'STOCK_ETF' | 'DERIV_CRYPTO';
  volatility: 'LOW' | 'MID' | 'HIGH';
};

export type SignupDraft = {
  basic: BasicForm;
  survey?: RiskProfile;
};
