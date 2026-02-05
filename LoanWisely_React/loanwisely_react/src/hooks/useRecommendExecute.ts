// Hook to execute recommendation.
import { useMutation } from "@tanstack/react-query";

import { executeRecommendation } from "@/api/recommendApi";
import type { RecommendExecuteRequest, RecommendExecuteResponse } from "@/types/recommend";

export const useRecommendExecute = () =>
  useMutation<RecommendExecuteResponse, Error, RecommendExecuteRequest>({
    mutationFn: (payload) => executeRecommendation(payload),
  });


