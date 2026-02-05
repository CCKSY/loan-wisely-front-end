"use client";
// Recommendation result UI.

import { useState } from "react";
import { useSearchParams } from "next/navigation";

import AppHeader from "@/components/common/AppHeader";
import ActionSection from "@/components/recommend/sections/ActionSection";
import ProductGridSection from "@/components/recommend/sections/ProductGridSection";
import RecommendHeroSection from "@/components/recommend/sections/RecommendHeroSection";
import RecommendationListSection from "@/components/recommend/sections/RecommendationListSection";
import RiskSection from "@/components/recommend/sections/RiskSection";
import SimulationSection from "@/components/recommend/sections/SimulationSection";
import SummarySection from "@/components/recommend/sections/SummarySection";

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
  const [showAllProducts, setShowAllProducts] = useState(false);
  const searchParams = useSearchParams();
  const recommendationId = searchParams.get("id");
  const { data, isLoading } = useRecommendResult(recommendationId);
  const { data: listData } = useRecommendationList();
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

  return (
    <main className="min-h-screen bg-gradient-to-br from-stone-100 via-stone-100 to-amber-50 px-16 py-14">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-9">
        <AppHeader />

        <section className="flex flex-col gap-6 rounded-[32px] border border-stone-200 bg-white/90 p-8 shadow-soft-lg">
          <RecommendHeroSection hasId={Boolean(recommendationId)} isLoading={isLoading} />

          <RecommendationListSection items={listData?.items ?? []} />

          <SummarySection
            summaryItems={splitSummary(explain.summary)}
            levelUsed={explain.levelUsed}
            levelStatus={explain.levelStatus}
          />

          <SimulationSection monthlyPaymentExample={detail.monthlyPaymentExample} />

          <ProductGridSection
            products={products}
            fallbackTags={reasons}
            showAll={showAllProducts}
            onShowAll={() => setShowAllProducts(true)}
          />

          <RiskSection riskNotes={riskNotes} fallbackNote={detail.riskWarning} />

          <ActionSection />
        </section>
      </div>
    </main>
  );
};

export default RecommendResultPage;
