import { useQuery } from "@tanstack/react-query";

import { fetchRecommendResult } from "@/api/recommendApi";
import type { RecommendResultResponse } from "@/types/recommend";

export const useRecommendResult = () =>
  useQuery<RecommendResultResponse>({
    queryKey: ["recommendResult"],
    queryFn: fetchRecommendResult,
  });

