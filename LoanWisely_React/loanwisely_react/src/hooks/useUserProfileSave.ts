// Hook to save user profile.
import { useMutation } from "@tanstack/react-query";

import { saveUserProfile } from "@/api/userApi";
import type { UserProfileSaveRequest, UserProfileSaveResponse } from "@/types/user";

export const useUserProfileSave = () =>
  useMutation<UserProfileSaveResponse, Error, UserProfileSaveRequest>({
    mutationFn: (payload) => saveUserProfile(payload),
  });


