// Hook to save LV2 credit.
import { useMutation } from "@tanstack/react-query";

import { saveUserCreditLv2 } from "@/api/userApi";
import type { UserCreditLv2Request, UserCreditLv2Response } from "@/types/user";

export const useUserCreditLv2Save = () =>
  useMutation<UserCreditLv2Response, Error, UserCreditLv2Request>({
    mutationFn: (payload) => saveUserCreditLv2(payload),
  });


