import { fetcher } from "@/lib/fetcher";

import type { RecommendResultResponse } from "./types";

export const fetchRecommendResult = async (): Promise<RecommendResultResponse> =>
  fetcher<RecommendResultResponse>("/api/recommend", {
    method: "GET",
  });
