// 추천 관련 API 호출 함수들을 모아둔 파일
import { fetcher } from "@/infra/fetcher";

import type {
  RecommendExecuteRequest,
  RecommendExecuteResponse,
  RecommendExplainResponse,
  RecommendResultResponse,
  RecommendationListResponse,
} from "@/types/recommend";
import type { ApiResponse } from "@/types/common";

export const executeRecommendation = async (
  payload: RecommendExecuteRequest,
): Promise<RecommendExecuteResponse> =>
  fetcher<ApiResponse<{ recommendationId?: string }>>("/api/recommendations", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(payload),
  }).then((data) => ({
    recommendationId: data.data?.recommendationId ?? "",
  }));

export const fetchRecommendationDetail = async (
  recommendationId: string,
): Promise<RecommendResultResponse> =>
  fetcher<ApiResponse<RecommendResultResponse>>(
    `/api/recommendations/${encodeURIComponent(recommendationId)}`,
    { method: "GET" },
  ).then((data) => data.data);

export const fetchRecommendationExplain = async (
  recommendationId: string,
): Promise<RecommendExplainResponse> =>
  fetcher<ApiResponse<RecommendExplainResponse>>(
    `/api/recommendations/${encodeURIComponent(recommendationId)}/explain`,
    { method: "GET" },
  ).then((data) => data.data);

export const fetchRecommendationList = async (
  page = 0,
  size = 10,
): Promise<RecommendationListResponse> =>
  fetcher<ApiResponse<RecommendationListResponse>>(
    `/api/users/me/recommendations?page=${page}&size=${size}`,
    { method: "GET" },
  ).then((data) => data.data);



