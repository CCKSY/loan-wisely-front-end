// User, profile, and credit types.
export type UserProfileResponse = {
  profilePayload: UserProfilePayload;
  versionId: string;
};

export type UserInputLv1 = {
  age: number | null;
  incomeYear: number | null;
  gender: "male" | "female" | null;
};

export type UserInputLv2 = {
  employmentType: string | null;
  residenceType: string | null;
};

export type UserInputLv3 = {
  loanPurpose: string | null;
  totalDebt: number | null;
  existingLoanCount: number | null;
  consent: boolean;
};

export type UserInputPayload = {
  lv1: UserInputLv1;
  lv2: UserInputLv2;
  lv3: UserInputLv3;
};

export type UserConsentLevel = "LV2" | "LV3";

export type UserConsentRequest = {
  level: UserConsentLevel;
  purposeTags: string[];
};

export type UserConsentResponse = {
  consentId: string;
};

export type UserCreditLv2Request = {
  lv2Payload: UserInputLv2;
  consentId: string;
};

export type UserCreditLv2Response = {
  lv2VersionId: string;
};

export type UserCreditLv3Request = {
  lv3Payload: UserCreditLv3Payload;
  sourceType: string;
};

export type UserCreditLv3Response = {
  lv3VersionId: string;
};

export type UserCreditLv3Payload = Omit<UserInputLv3, "consent">;

export type UserProfilePayload = {
  age: number | null;
  incomeYear: number | null;
  gender: "male" | "female" | null;
};

export type UserProfileSaveRequest = {
  profilePayload: UserProfilePayload;
};

export type UserProfileSaveResponse = {
  profileVersionId: string;
};


