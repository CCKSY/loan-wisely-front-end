"use client";
// Recommendation result UI.

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import AppHeader from "@/components/common/AppHeader";
import ActionSection from "@/components/recommend/sections/ActionSection";
import ProductGridSection from "@/components/recommend/sections/ProductGridSection";
import RecommendHeroSection from "@/components/recommend/sections/RecommendHeroSection";
import RecommendationListSection from "@/components/recommend/sections/RecommendationListSection";
import RiskSection from "@/components/recommend/sections/RiskSection";
import SimulationSection from "@/components/recommend/sections/SimulationSection";
import SummarySection from "@/components/recommend/sections/SummarySection";

import { getAccessToken } from "@/infra/auth";
import { useRecommendResult } from "@/hooks/useRecommendResult";
import { useRecommendationList } from "@/hooks/useRecommendationList";
import { useRecommendationExplain } from "@/hooks/useRecommendationExplain";

const splitSummary = (summary: string): string[] => {
  const parts = summary.split(/[\n•]/).map((item) => item.trim()).filter(Boolean);
  if (parts.length >= 3) {
    return parts.slice(0, 3);
  }
  return [
    summary || "입력 조건을 바탕으로 추천을 구성했습니다.",
    "상환 여력을 고려한 상품을 우선 정렬했습니다.",
    "리스크 항목을 함께 확인해 주세요.",
  ];
};

const RecommendResultPage = () => {
  const [showAllProducts, setShowAllProducts] = useState(true);
  const [listPage, setListPage] = useState(0);
  const listSize = 5;
  const searchParams = useSearchParams();
  const recommendationId = searchParams.get("id");
  const { data, isLoading } = useRecommendResult(recommendationId);
  const [accessToken, setAccessToken] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    setAccessToken(getAccessToken());
  }, []);

  const { data: listData } = useRecommendationList(listPage, listSize, Boolean(accessToken));
  const { data: explainData } = useRecommendationExplain(recommendationId);

  const explain = explainData ?? data?.explain ?? {
    summary: "추천에 사용된 입력 요약이 표시됩니다.",
    levelUsed: "LV1",
    levelStatus: "empty",
  };
  const reasons = explainData?.reasons ?? [];
  const riskNotes = explainData?.riskNotes ?? [];

  const products = data?.products ?? [
    {
      id: "demo-1",
      lenderName: "대출사명",
      productName: "대출 상품명",
      rate: "금리 월 6.2%",
      limit: "최대 한도 500만원",
      reason: "추천 사유가 표시됩니다.",
      suitabilityScore: 78,
      riskNote: "주의사항이 표시됩니다.",
    },
    {
      id: "demo-2",
      lenderName: "대출사명",
      productName: "대출 상품명",
      rate: "금리 월 6.2%",
      limit: "최대 한도 500만원",
      reason: "추천 사유가 표시됩니다.",
      suitabilityScore: 72,
      riskNote: "주의사항이 표시됩니다.",
    },
    {
      id: "demo-3",
      lenderName: "대출사명",
      productName: "대출 상품명",
      rate: "금리 월 6.0%",
      limit: "최대 한도 700만원",
      reason: "추천 사유가 표시됩니다.",
      suitabilityScore: 69,
      riskNote: "주의사항이 표시됩니다.",
    },
    {
      id: "demo-4",
      lenderName: "대출사명",
      productName: "대출 상품명",
      rate: "금리 월 5.9%",
      limit: "최대 한도 900만원",
      reason: "추천 사유가 표시됩니다.",
      suitabilityScore: 65,
      riskNote: "주의사항이 표시됩니다.",
    },
    {
      id: "demo-5",
      lenderName: "대출사명",
      productName: "대출 상품명",
      rate: "금리 월 6.4%",
      limit: "최대 한도 300만원",
      reason: "추천 사유가 표시됩니다.",
      suitabilityScore: 61,
      riskNote: "주의사항이 표시됩니다.",
    },
  ];

  const detail = data?.detail ?? {
    description: "상품 상세 정보가 표시됩니다.",
    monthlyPaymentExample: "월 상환액 예시가 표시됩니다.",
    riskWarning: "고위험 조건 경고 및 승인 보장 아님 고지가 표시됩니다.",
  };
  const purposeMismatchMessage = "대출 목적이 정책상 허용되지 않습니다.";
  const normalizeReason = (value?: string | null): string => {
    if (!value) return "";
    return value
      .replace(/[\u200B-\u200D\uFEFF]/g, "")
      .replace(/\s+/g, "")
      .trim();
  };
  const normalizedPurposeMismatch = normalizeReason(purposeMismatchMessage);
  const hasPurposeMismatch = (reason?: string | null): boolean =>
    normalizeReason(reason).includes(normalizedPurposeMismatch);
  const eligibleProducts = products.filter((product) => !hasPurposeMismatch(product.reason));
  const excludedProducts = products.filter((product) => hasPurposeMismatch(product.reason));
  const eligibleFallbackTags = reasons.filter(
    (reason) => reason !== purposeMismatchMessage,
  );

  return (
    <main className="min-h-screen bg-gradient-to-br from-stone-100 via-stone-100 to-amber-50 px-16 py-14">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-9">
        <AppHeader />

        <section className="flex flex-col gap-6 rounded-[32px] border border-stone-200 bg-white/90 p-8 shadow-soft-lg">
          <RecommendHeroSection hasId={Boolean(recommendationId)} isLoading={isLoading} />

          <RecommendationListSection
            items={listData?.items ?? []}
            page={listData?.page ?? listPage}
            size={listData?.size ?? listSize}
            total={listData?.total ?? 0}
            onPageChange={setListPage}
          />

          <SummarySection
            summaryItems={splitSummary(explain.summary)}
            levelUsed={explain.levelUsed}
            levelStatus={explain.levelStatus}
          />

          <SimulationSection monthlyPaymentExample={detail.monthlyPaymentExample} />

          <div className="grid gap-4">
            <h3 className="text-lg font-semibold text-stone-900">추천 상품</h3>
            <ProductGridSection
              products={eligibleProducts}
              fallbackTags={eligibleFallbackTags}
              showAll={showAllProducts}
              onShowAll={() => setShowAllProducts(true)}
            />
          </div>

          {excludedProducts.length > 0 && (
            <div className="grid gap-4">
              <h3 className="text-lg font-semibold text-stone-900">
                목적 불일치 및 제외 상품
              </h3>
              <ProductGridSection
                products={excludedProducts}
                fallbackTags={[purposeMismatchMessage]}
                showAll={true}
                onShowAll={() => {}}
              />
            </div>
          )}

          <RiskSection riskNotes={riskNotes} fallbackNote={detail.riskWarning} />

          <ActionSection />
        </section>
      </div>
    </main>
  );
};

export default RecommendResultPage;
