import { useMutation } from "@tanstack/react-query";

import { loginUser } from "@/api/authApi";
import { setAccessToken } from "@/infra/auth";
import type { UserLoginRequest, UserLoginResponse } from "@/types/auth";

export const useUserLogin = () =>
  useMutation<UserLoginResponse, Error, UserLoginRequest>({
    mutationFn: async (payload) => {
      const data = await loginUser(payload);
      setAccessToken(data.accessToken, data.expiresInSeconds);
      return data;
    },
  });
