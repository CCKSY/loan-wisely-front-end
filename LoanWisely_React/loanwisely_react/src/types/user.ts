// User, profile, and credit types.
export type UserProfileResponse = {
  profilePayload: UserProfilePayload;
  versionId: string;
};

export type UserInputLv1 = {
  age: number | null;
  annualIncome: number | null;
  gender: "male" | "female" | null;
};

export type UserInputLv2 = {
  employmentType: string | null;
  residenceType: string | null;
};

export type UserInputLv3 = {
  loanPurpose: string | null;
  totalDebtAmount: number | null;
  existingLoanCount: number | null;
  consent: boolean;
};

export type UserInputPayload = {
  lv1: UserInputLv1;
  lv2: UserInputLv2;
  lv3: UserInputLv3;
};

export type UserConsentLevel = 1 | 2 | 3;

export type UserConsentRequest = {
  consentLevel: UserConsentLevel;
  consentGiven: boolean;
};

export type UserConsentResponse = {
  userId: number;
  consentLevel: number;
  consentGiven: "Y" | "N";
  isActive: "Y" | "N";
  createdAt: string;
};

export type UserCreditLv1Request = {
  age: number | null;
  incomeYear: number | null;
  gender: "male" | "female" | null;
};

export type UserCreditLv1Response = {
  userId: number;
  age: number;
  incomeYear: number;
  gender: "male" | "female" | string;
  createdAt: string;
};

export type UserCreditLv2Request = {
  employmentType: string | null;
  residenceType: string | null;
};

export type UserCreditLv2Response = {
  lv2VersionId: string;
};

export type UserCreditLv3Request = {
  loanPurpose: string | null;
  totalDebt: number | null;
  existingLoanCount: number | null;
};

export type UserCreditLv3Response = {
  lv3VersionId: string;
};

export type UserProfilePayload = {
  age: number | null;
  annualIncome: number | null;
  gender: "male" | "female" | null;
};

export type UserProfileSaveRequest = {
  inputLevel: number;
  age: number | null;
  incomeYear: number | null;
  gender: "male" | "female" | null;
  employmentType?: string | null;
  residenceType?: string | null;
  debtTotal?: number | null;
  existingLoanCount?: number | null;
  loanPurpose?: string | null;
};

export type UserProfileSaveResponse = {
  profileVersionId: string;
};


