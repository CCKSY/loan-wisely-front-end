// Hook to orchestrate save, consent, and recommendation flow.
import { useMutation } from "@tanstack/react-query";

import {
  createUserConsent,
  saveUserCreditLv1,
  saveUserCreditLv2,
  saveUserCreditLv3,
  saveUserProfile,
} from "@/api/userApi";
import { executeRecommendation } from "@/api/recommendApi";
import type {
  UserConsentLevel,
  UserInputPayload,
  UserInputLv2,
  UserInputLv3,
} from "@/types/user";
import type { RecommendExecuteResponse } from "@/types/recommend";

const emptyToNull = (value: string): string | null =>
  value.trim() === "" ? null : value;

const toWon = (value: number | null | undefined): number | null => {
  if (value === null || value === undefined || Number.isNaN(value)) {
    return null;
  }
  return Math.round(value * 10000);
};

const hasValue = (value: string | number | null): boolean => {
  if (typeof value === "number") {
    return Number.isFinite(value);
  }
  if (typeof value === "string") {
    return value.trim().length > 0;
  }
  return false;
};

const hasLv2Input = (payload: UserInputLv2): boolean =>
  hasValue(payload.employmentType ?? null) || hasValue(payload.residenceType ?? null);

const hasLv3Input = (payload: UserInputLv3): boolean =>
  hasValue(payload.loanPurpose ?? null) ||
  hasValue(payload.totalDebtAmount ?? null) ||
  hasValue(payload.existingLoanCount ?? null);

const getInputLevel = (hasLv2: boolean, hasLv3: boolean): UserConsentLevel => {
  if (hasLv3) {
    return 3;
  }
  if (hasLv2) {
    return 2;
  }
  return 1;
};

const hasLv1Input = (payload: UserInputPayload["lv1"]): boolean =>
  hasValue(payload.age ?? null) &&
  hasValue(payload.annualIncome ?? null) &&
  hasValue(payload.gender ?? null);

const buildPayload = (values: UserInputPayload): UserInputPayload => ({
  lv1: {
    age: values.lv1.age ?? null,
    annualIncome: toWon(values.lv1.annualIncome ?? null),
    gender: values.lv1.gender ?? null,
  },
  lv2: {
    employmentType: emptyToNull(values.lv2.employmentType ?? ""),
    residenceType: emptyToNull(values.lv2.residenceType ?? ""),
  },
  lv3: {
    loanPurpose: emptyToNull(values.lv3.loanPurpose ?? ""),
    totalDebtAmount: toWon(values.lv3.totalDebtAmount ?? null),
    existingLoanCount: values.lv3.existingLoanCount ?? null,
    consent: values.lv3.consent,
  },
});

export const useRecommendFlow = () =>
  useMutation<RecommendExecuteResponse, Error, UserInputPayload>({
    mutationFn: async (formPayload) => {
      const payload = buildPayload(formPayload);

      if (!hasLv1Input(payload.lv1)) {
        throw new Error("LV1_REQUIRED");
      }

      const hasLv2 = hasLv2Input(payload.lv2);
      const hasLv3 = hasLv3Input(payload.lv3);
      const hasConsent = payload.lv3.consent === true;
      const inputLevel = getInputLevel(hasLv2, hasLv3);

      const profileResponse = await saveUserProfile({
        inputLevel,
        age: payload.lv1.age,
        incomeYear: payload.lv1.annualIncome,
        gender: payload.lv1.gender,
        employmentType: hasLv2 ? payload.lv2.employmentType : null,
        residenceType: hasLv2 ? payload.lv2.residenceType : null,
        debtTotal: hasLv3 ? payload.lv3.totalDebtAmount : null,
        existingLoanCount: hasLv3 ? payload.lv3.existingLoanCount : null,
        loanPurpose: hasLv3 ? payload.lv3.loanPurpose : null,
      });

      let lv2VersionId: string | undefined;
      let lv3VersionId: string | undefined;

      await saveUserCreditLv1({
        age: payload.lv1.age,
        incomeYear: payload.lv1.annualIncome,
        gender: payload.lv1.gender,
      });

      if (hasConsent) {
        const consentLevel: UserConsentLevel = inputLevel;
        await createUserConsent({
          consentLevel,
          consentGiven: true,
        });
      }

      if (hasLv2) {
        try {
          const lv2Response = await saveUserCreditLv2({
            employmentType: payload.lv2.employmentType,
            residenceType: payload.lv2.residenceType,
          });
          lv2VersionId = lv2Response.lv2VersionId;
        } catch {
          lv2VersionId = undefined;
        }
      }

      if (hasLv3) {
        try {
          const lv3Response = await saveUserCreditLv3({
            loanPurpose: payload.lv3.loanPurpose,
            totalDebt: payload.lv3.totalDebtAmount,
            existingLoanCount: payload.lv3.existingLoanCount,
          });
          lv3VersionId = lv3Response.lv3VersionId;
        } catch {
          lv3VersionId = undefined;
        }
      }

      return executeRecommendation({
        versionIds: {
          profileVersionId: profileResponse.profileVersionId,
          lv2VersionId,
          lv3VersionId,
        },
      });
    },
  });


