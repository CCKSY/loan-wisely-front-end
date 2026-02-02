import { useQuery } from "@tanstack/react-query";

import { fetchRecommendResult } from "../api";
import type { RecommendResultResponse } from "../types";

export const useRecommendResult = () =>
  useQuery<RecommendResultResponse>({
    queryKey: ["recommendResult"],
    queryFn: fetchRecommendResult,
  });
