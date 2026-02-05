// Hook to create consent.
import { useMutation } from "@tanstack/react-query";

import { createUserConsent } from "@/api/userApi";
import type { UserConsentRequest, UserConsentResponse } from "@/types/user";

export const useUserConsentCreate = () =>
  useMutation<UserConsentResponse, Error, UserConsentRequest>({
    mutationFn: (payload) => createUserConsent(payload),
  });


