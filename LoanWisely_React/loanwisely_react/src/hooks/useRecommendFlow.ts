// Hook to orchestrate save, consent, and recommendation flow.
import { useMutation } from "@tanstack/react-query";

import { createUserConsent, saveUserCreditLv2, saveUserCreditLv3, saveUserProfile } from "@/api/userApi";
import { executeRecommendation } from "@/api/recommendApi";
import type {
  UserConsentLevel,
  UserInputPayload,
  UserInputLv2,
  UserInputLv3,
  UserCreditLv3Payload,
} from "@/types/user";
import type { RecommendExecuteResponse } from "@/types/recommend";

const emptyToNull = (value: string): string | null =>
  value.trim() === "" ? null : value;

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
  hasValue(payload.totalDebt ?? null) ||
  hasValue(payload.existingLoanCount ?? null);

const buildPayload = (values: UserInputPayload): UserInputPayload => ({
  lv1: {
    age: values.lv1.age ?? null,
    incomeYear: values.lv1.incomeYear ?? null,
    gender: values.lv1.gender ?? null,
  },
  lv2: {
    employmentType: emptyToNull(values.lv2.employmentType ?? ""),
    residenceType: emptyToNull(values.lv2.residenceType ?? ""),
  },
  lv3: {
    loanPurpose: emptyToNull(values.lv3.loanPurpose ?? ""),
    totalDebt: values.lv3.totalDebt ?? null,
    existingLoanCount: values.lv3.existingLoanCount ?? null,
    consent: values.lv3.consent,
  },
});

export const useRecommendFlow = () =>
  useMutation<RecommendExecuteResponse, Error, UserInputPayload>({
    mutationFn: async (formPayload) => {
      const payload = buildPayload(formPayload);

      const hasLv2 = hasLv2Input(payload.lv2);
      const hasLv3 = hasLv3Input(payload.lv3);
      const hasConsent = payload.lv3.consent === true;

      const profileResponse = await saveUserProfile({
        profilePayload: payload.lv1,
      });

      let consentId: string | null = null;
      let lv2VersionId: string | undefined;
      let lv3VersionId: string | undefined;

      if (hasConsent && (hasLv2 || hasLv3)) {
        const consentLevel: UserConsentLevel = hasLv2 ? "LV2" : "LV3";
        const consentResponse = await createUserConsent({
          level: consentLevel,
          purposeTags: ["loan-recommendation"],
        });
        consentId = consentResponse.consentId;
      }

      if (hasLv2 && consentId) {
        const lv2Response = await saveUserCreditLv2({
          lv2Payload: payload.lv2,
          consentId,
        });
        lv2VersionId = lv2Response.lv2VersionId;
      }

      if (hasLv3) {
        const lv3Payload: UserCreditLv3Payload = {
          loanPurpose: payload.lv3.loanPurpose,
          totalDebt: payload.lv3.totalDebt,
          existingLoanCount: payload.lv3.existingLoanCount,
        };
        const lv3Response = await saveUserCreditLv3({
          lv3Payload,
          sourceType: "USER_INPUT",
        });
        lv3VersionId = lv3Response.lv3VersionId;
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


