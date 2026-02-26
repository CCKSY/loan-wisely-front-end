import { useMutation } from "@tanstack/react-query";

import { registerUser } from "@/api/authApi";
import type { UserRegisterRequest, UserRegisterResponse } from "@/types/auth";

export const useUserRegister = () =>
  useMutation<UserRegisterResponse, Error, UserRegisterRequest>({
    mutationFn: (payload) => registerUser(payload),
  });
