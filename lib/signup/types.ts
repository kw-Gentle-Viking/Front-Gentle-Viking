export type SignupForm = {
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
};

export type SignupDraft = {
  basic: SignupForm;
  survey?: RiskProfile;
};
