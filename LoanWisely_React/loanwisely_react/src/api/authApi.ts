import { fetcher } from "@/infra/fetcher";
import type { ApiResponse } from "@/types/common";
import type {
  UserLoginRequest,
  UserLoginResponse,
  UserRegisterRequest,
  UserRegisterResponse,
} from "@/types/auth";

export const verifyUser = async (): Promise<void> => {
  await fetcher("/api/auth/verify", { method: "POST" });
};

export const loginUser = async (
  payload: UserLoginRequest,
): Promise<UserLoginResponse> => {
  const data = await fetcher<ApiResponse<UserLoginResponse>>("/api/auth/login", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  return data.data;
};

export const registerUser = async (
  payload: UserRegisterRequest,
): Promise<UserRegisterResponse> => {
  const data = await fetcher<ApiResponse<UserRegisterResponse>>(
    "/api/auth/register",
    {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(payload),
    },
  );
  return data.data;
};
