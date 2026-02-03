import { useMutation } from "@tanstack/react-query";

import { submitUserInput } from "@/api/userApi";
import type { UserInputPayload } from "@/types/user";

export const useUserInputSubmit = () =>
  useMutation({
    mutationFn: (payload: UserInputPayload) => submitUserInput(payload),
  });

