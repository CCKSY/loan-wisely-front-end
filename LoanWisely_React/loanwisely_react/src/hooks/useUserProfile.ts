 import { useQuery } from "@tanstack/react-query";

 import { fetchUserProfile } from "@/api/userApi";

 export const useUserProfile = (userId: string) =>
   useQuery({
     queryKey: ["userProfile", userId],
     queryFn: () => fetchUserProfile(userId),
     enabled: userId.trim().length > 0,
   });

