// Hook to load recommendation list.
import { useQuery } from "@tanstack/react-query";

import { fetchRecommendationList } from "@/api/recommendApi";
import type { RecommendationListResponse } from "@/types/recommend";

export const useRecommendationList = (page = 0, size = 10, enabled = true) =>
  useQuery<RecommendationListResponse>({
    queryKey: ["recommendationList", page, size],
    queryFn: () => fetchRecommendationList(page, size),
    enabled,
  });


