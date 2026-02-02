import { useMutation } from "@tanstack/react-query";

import { submitUserInput } from "../api";
import type { UserInputPayload } from "../types";

export const useUserInputSubmit = () =>
  useMutation({
    mutationFn: (payload: UserInputPayload) => submitUserInput(payload),
  });
