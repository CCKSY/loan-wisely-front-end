// Hook to save LV3 credit.
import { useMutation } from "@tanstack/react-query";

import { saveUserCreditLv3 } from "@/api/userApi";
import type { UserCreditLv3Request, UserCreditLv3Response } from "@/types/user";

export const useUserCreditLv3Save = () =>
  useMutation<UserCreditLv3Response, Error, UserCreditLv3Request>({
    mutationFn: (payload) => saveUserCreditLv3(payload),
  });


