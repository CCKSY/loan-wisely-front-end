export type UserProfile = {
  id: string;
  name: string;
  email: string;
};

export type UserProfileResponse = {
  profile: UserProfile;
};

export type UserInputLv1 = {
  age: number | null;
  annualIncome: number | null;
  gender: "male" | "female" | null;
};

export type UserInputLv2 = {
  employmentStatus: string | null;
  residenceType: string | null;
};

export type UserInputLv3 = {
  loanPurpose: string | null;
  totalDebtAmount: number | null;
  loanCount: number | null;
  consent: boolean;
};

export type UserInputPayload = {
  lv1: UserInputLv1;
  lv2: UserInputLv2;
  lv3: UserInputLv3;
};
