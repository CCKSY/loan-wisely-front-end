import { fetcher } from "@/lib/fetcher";

import type { UserInputPayload, UserProfileResponse } from "./types";

export const fetchUserProfile = async (userId: string): Promise<UserProfileResponse> =>
  fetcher<UserProfileResponse>(`/api/user?userId=${encodeURIComponent(userId)}`);

export const submitUserInput = async (payload: UserInputPayload): Promise<void> =>
  fetcher<void>("/api/user", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(payload),
  });
