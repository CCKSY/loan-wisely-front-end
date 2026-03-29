// Hook to load recommendation explain data.
import { useQuery } from "@tanstack/react-query";

import { fetchRecommendationExplain } from "@/api/recommendApi";
import type { RecommendExplainResponse } from "@/types/recommend";

export const useRecommendationExplain = (recommendationId: string | null) =>
  useQuery<RecommendExplainResponse>({
    queryKey: ["recommendationExplain", recommendationId],
    queryFn: () => fetchRecommendationExplain(recommendationId ?? ""),
    enabled: Boolean(recommendationId),
  });


