// Recommendation API types.
export type LvUsageStatus = "full" | "partial" | "empty";

export type RecommendExplain = {
  summary: string;
  levelUsed: "LV1" | "LV2" | "LV3";
  levelStatus: LvUsageStatus;
};

export type RecommendProduct = {
  id: string;
  lenderName: string;
  productName: string;
  rate: string;
  limit: string;
  reason: string;
  suitabilityScore: number;
  riskNote: string;
  providerUrl?: string;
  estimationDetails?: RecommendEstimationDetail[];
};

export type RecommendEstimationDetail = {
  factorCode: string;
  factorName: string;
  factorValue: string;
  contribution?: string | null;
};

export type RecommendDetail = {
  description: string;
  monthlyPaymentExample: string;
  riskWarning: string;
};

export type RecommendResultResponse = {
  explain: RecommendExplain;
  products: RecommendProduct[];
  detail: RecommendDetail | null;
};

export type RecommendExplainResponse = {
  summary: string;
  levelUsed: "LV1" | "LV2" | "LV3";
  levelStatus: LvUsageStatus;
  reasons: string[];
  riskNotes: string[];
};

export type RecommendExecuteRequest = {
  versionIds: {
    profileVersionId?: string;
    lv2VersionId?: string;
    lv3VersionId?: string;
  };
  options?: Record<string, unknown>;
};

export type RecommendExecuteResponse = {
  recommendationId: string;
};

export type RecommendationListItem = {
  id: string;
  title: string;
  createdAt: string;
  products: {
    productName: string;
    rate: string;
    limit: string;
    repaymentMethod: string;
  }[];
};

export type RecommendationListResponse = {
  items: RecommendationListItem[];
  page: number;
  size: number;
  total: number;
};


