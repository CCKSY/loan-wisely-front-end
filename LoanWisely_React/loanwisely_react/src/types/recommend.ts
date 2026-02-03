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
