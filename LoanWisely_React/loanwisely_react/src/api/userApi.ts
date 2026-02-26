// 사용자 프로필, 동의서, 신용 정보 관련 API 호출 함수들을 모아둔 파일
import { fetcher } from "@/infra/fetcher";

import type {
  UserConsentRequest,
  UserConsentResponse,
  UserCreditLv1Request,
  UserCreditLv1Response,
  UserCreditLv2Request,
  UserCreditLv2Response,
  UserCreditLv3Request,
  UserCreditLv3Response,
  UserProfileSaveRequest,
  UserProfileSaveResponse,
  UserProfileResponse,
} from "@/types/user";

export const fetchUserProfile = async (): Promise<UserProfileResponse> =>
  fetcher<UserProfileResponse>("/api/users/me/profile");

export const createUserConsent = async (
  payload: UserConsentRequest,
): Promise<UserConsentResponse> =>
  fetcher<UserConsentResponse>("/api/users/me/consents", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(payload),
  });

export const saveUserCreditLv1 = async (
  payload: UserCreditLv1Request,
): Promise<UserCreditLv1Response> =>
  fetcher<UserCreditLv1Response>("/api/users/me/credit/lv1", {
    method: "PUT",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      age: payload.age,
      incomeYear: payload.incomeYear,
      gender: payload.gender,
    }),
  });

export const saveUserCreditLv2 = async (
  payload: UserCreditLv2Request,
): Promise<UserCreditLv2Response> =>
  fetcher<UserCreditLv2Response>("/api/users/me/credit/lv2", {
    method: "PUT",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      employmentType: payload.employmentType,
      residenceType: payload.residenceType,
    }),
  });

export const saveUserCreditLv3 = async (
  payload: UserCreditLv3Request,
): Promise<UserCreditLv3Response> =>
  fetcher<UserCreditLv3Response>("/api/users/me/credit/lv3", {
    method: "PUT",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      loanPurpose: payload.loanPurpose,
      totalDebt: payload.totalDebt,
      existingLoanCount: payload.existingLoanCount,
    }),
  });

export const saveUserProfile = async (
  payload: UserProfileSaveRequest,
): Promise<UserProfileSaveResponse> =>
  fetcher<UserProfileSaveResponse>("/api/users/me/profile", {
    method: "PUT",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      inputLevel: payload.inputLevel,
      age: payload.age,
      incomeYear: payload.incomeYear,
      gender: payload.gender,
      employmentType: payload.employmentType,
      residenceType: payload.residenceType,
      debtTotal: payload.debtTotal,
      existingLoanCount: payload.existingLoanCount,
      loanPurpose: payload.loanPurpose,
    }),
  });



