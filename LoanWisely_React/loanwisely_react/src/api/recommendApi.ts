import { fetcher } from "@/infra/fetcher";

import type { RecommendResultResponse } from "@/types/recommend";

export const fetchRecommendResult = async (): Promise<RecommendResultResponse> =>
  fetcher<RecommendResultResponse>("/api/recommend", {
    method: "GET",
  });

