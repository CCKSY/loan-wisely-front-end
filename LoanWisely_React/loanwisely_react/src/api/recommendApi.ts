// 추천 관련 API 호출 함수들을 모아둔 파일
import { fetcher } from "@/infra/fetcher";

import type {
  RecommendExecuteRequest,
  RecommendExecuteResponse,
  RecommendExplainResponse,
  RecommendResultResponse,
  RecommendationListResponse,
} from "@/types/recommend";

export const executeRecommendation = async (
  payload: RecommendExecuteRequest,
): Promise<RecommendExecuteResponse> =>
  fetcher<RecommendExecuteResponse>("/api/recommendations", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(payload),
  });

export const fetchRecommendationDetail = async (
  recommendationId: string,
): Promise<RecommendResultResponse> =>
  fetcher<RecommendResultResponse>(
    `/api/recommendations/${encodeURIComponent(recommendationId)}`,
    { method: "GET" },
  );

export const fetchRecommendationExplain = async (
  recommendationId: string,
): Promise<RecommendExplainResponse> =>
  fetcher<RecommendExplainResponse>(
    `/api/recommendations/${encodeURIComponent(recommendationId)}/explain`,
    { method: "GET" },
  );

export const fetchRecommendationList = async (
  page = 0,
  size = 10,
): Promise<RecommendationListResponse> =>
  fetcher<RecommendationListResponse>(
    `/api/users/me/recommendations?page=${page}&size=${size}`,
    { method: "GET" },
  );



