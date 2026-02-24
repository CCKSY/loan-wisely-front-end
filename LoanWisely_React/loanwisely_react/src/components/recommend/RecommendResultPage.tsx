"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";

import AppHeader from "@/components/common/AppHeader";
import ActionSection from "@/components/recommend/sections/ActionSection";
import ProductGridSection from "@/components/recommend/sections/ProductGridSection";
import RecommendHeroSection from "@/components/recommend/sections/RecommendHeroSection";
import RecommendationListSection from "@/components/recommend/sections/RecommendationListSection";
import SimulationSection from "@/components/recommend/sections/SimulationSection";

import { getAccessToken } from "@/infra/auth";
import { useRecommendResult } from "@/hooks/useRecommendResult";
import { useRecommendationList } from "@/hooks/useRecommendationList";
import { useRecommendationExplain } from "@/hooks/useRecommendationExplain";

const normalizeReason = (value?: string | null): string => {
  if (!value) return "";
  return value
    .replace(/[\u200B-\u200D\uFEFF]/g, "")
    .replace(/\s+/g, "")
    .toLowerCase()
    .trim();
};

const EXCLUSION_REASON_KEYWORDS = [
  "대출목적이정책상허용되지않습니다",
  "dsr가기준을초과했습니다",
  "dsr기준초과",
  "자격조건",
  "허용되지않습니다",
  "noteligible",
  "dsr",
];

const PURPOSE_MISMATCH_MESSAGE = "대출 목적이 정책상 허용되지 않습니다.";
const DSR_TOO_HIGH_MESSAGE = "DSR가 기준을 초과했습니다.";
const NOT_ELIGIBLE_MESSAGE = "대출 자격 조건에 해당하지 않습니다.";

const RecommendResultPage = () => {
  const [showAllProducts, setShowAllProducts] = useState(true);
  const [showExcludedProducts, setShowExcludedProducts] = useState(false);
  const [eligiblePage, setEligiblePage] = useState(1);
  const [excludedPage, setExcludedPage] = useState(1);
  const [listPage, setListPage] = useState(0);
  const listSize = 2;

  const searchParams = useSearchParams();
  const recommendationId = searchParams.get("id");

  const { data, isLoading } = useRecommendResult(recommendationId);
  const accessToken = getAccessToken();
  const { data: listData } = useRecommendationList(listPage, listSize, Boolean(accessToken));
  const { data: explainData } = useRecommendationExplain(recommendationId);

  const reasons = explainData?.reasons ?? [];
  const products = data?.products ?? [];
  const detail = data?.detail ?? {
    description: "상세 정보가 아직 제공되지 않았습니다.",
    monthlyPaymentExample: "상환 시뮬레이션 정보가 아직 제공되지 않았습니다.",
    riskWarning: "리스크 안내 정보가 아직 제공되지 않았습니다.",
  };

  const exclusionMessages = [PURPOSE_MISMATCH_MESSAGE, DSR_TOO_HIGH_MESSAGE, NOT_ELIGIBLE_MESSAGE];
  const normalizedExclusionMessages = exclusionMessages.map((msg) => normalizeReason(msg));

  const hasExclusionReason = (reason?: string | null): boolean => {
    const normalized = normalizeReason(reason);
    if (!normalized) return false;
    if (normalizedExclusionMessages.some((msg) => normalized.includes(msg))) return true;
    return EXCLUSION_REASON_KEYWORDS.some((keyword) => normalized.includes(keyword));
  };

  const eligibleProducts = products.filter((product) => !hasExclusionReason(product.reason));
  const excludedProducts = products.filter((product) => hasExclusionReason(product.reason));

  const eligibleFallbackTags = reasons.filter((reason) => !hasExclusionReason(reason));
  const excludedFallbackTags = reasons.filter((reason) => hasExclusionReason(reason));

  const productPageSize = 9;
  const eligibleTotalPages = Math.max(1, Math.ceil(eligibleProducts.length / productPageSize));
  const excludedTotalPages = Math.max(1, Math.ceil(excludedProducts.length / productPageSize));
  const eligibleCurrentPage = Math.min(eligiblePage, eligibleTotalPages);
  const excludedCurrentPage = Math.min(excludedPage, excludedTotalPages);

  const eligibleSlice = eligibleProducts.slice(
    (eligibleCurrentPage - 1) * productPageSize,
    eligibleCurrentPage * productPageSize,
  );
  const excludedSlice = excludedProducts.slice(
    (excludedCurrentPage - 1) * productPageSize,
    excludedCurrentPage * productPageSize,
  );

  const eligiblePages = Array.from({ length: eligibleTotalPages }, (_, i) => i + 1);
  const excludedPages = Array.from({ length: excludedTotalPages }, (_, i) => i + 1);

  return (
    <main className="min-h-screen bg-gradient-to-br from-stone-100 via-stone-100 to-amber-50 px-16 py-14">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-9">
        <AppHeader />

        <section className="flex flex-col gap-6 rounded-[32px] border border-stone-200 bg-white/90 p-8 shadow-soft-lg">
          <RecommendHeroSection hasId={Boolean(recommendationId)} isLoading={isLoading} />

          <div className="grid gap-4">
            <h3 className="text-lg font-semibold text-stone-900">추천 상품</h3>
            <ProductGridSection
              products={eligibleSlice}
              fallbackTags={eligibleFallbackTags}
              showAll={showAllProducts}
              onShowAll={() => setShowAllProducts(true)}
            />

            {eligibleProducts.length > productPageSize && (
              <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-stone-200 bg-white px-4 py-3 text-xs text-stone-500">
                <span>
                  총 {eligibleProducts.length}개 · {eligibleCurrentPage} / {eligibleTotalPages} 페이지
                </span>
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setEligiblePage((prev) => Math.max(1, prev - 1))}
                    disabled={eligibleCurrentPage === 1}
                    className="rounded-full border border-stone-200 px-3 py-1 disabled:opacity-40"
                  >
                    이전
                  </button>
                  {eligiblePages.map((pageNumber) => (
                    <button
                      key={`eligible-page-${pageNumber}`}
                      type="button"
                      onClick={() => setEligiblePage(pageNumber)}
                      className={
                        pageNumber === eligibleCurrentPage
                          ? "rounded-full bg-stone-900 px-3 py-1 text-white"
                          : "rounded-full border border-stone-200 px-3 py-1"
                      }
                    >
                      {pageNumber}
                    </button>
                  ))}
                  <button
                    type="button"
                    onClick={() =>
                      setEligiblePage((prev) => Math.min(eligibleTotalPages, prev + 1))
                    }
                    disabled={eligibleCurrentPage === eligibleTotalPages}
                    className="rounded-full border border-stone-200 px-3 py-1 disabled:opacity-40"
                  >
                    다음
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="grid gap-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h3 className="text-lg font-semibold text-stone-900">목적 불일치 및 제외 상품</h3>
              <button
                type="button"
                onClick={() => setShowExcludedProducts((prev) => !prev)}
                className="rounded-full border border-stone-200 px-4 py-2 text-xs font-semibold text-stone-700"
              >
                {showExcludedProducts ? "대출 제외 상품 닫기" : "대출 제외 상품 보기"}
              </button>
            </div>

            {showExcludedProducts ? (
              excludedProducts.length > 0 ? (
                <>
                  <ProductGridSection
                    products={excludedSlice}
                    fallbackTags={excludedFallbackTags.length > 0 ? excludedFallbackTags : exclusionMessages}
                    showAll={true}
                    onShowAll={() => {}}
                  />

                  {excludedProducts.length > productPageSize && (
                    <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-stone-200 bg-white px-4 py-3 text-xs text-stone-500">
                      <span>
                        총 {excludedProducts.length}개 · {excludedCurrentPage} / {excludedTotalPages} 페이지
                      </span>
                      <div className="flex flex-wrap items-center gap-2">
                        <button
                          type="button"
                          onClick={() => setExcludedPage((prev) => Math.max(1, prev - 1))}
                          disabled={excludedCurrentPage === 1}
                          className="rounded-full border border-stone-200 px-3 py-1 disabled:opacity-40"
                        >
                          이전
                        </button>
                        {excludedPages.map((pageNumber) => (
                          <button
                            key={`excluded-page-${pageNumber}`}
                            type="button"
                            onClick={() => setExcludedPage(pageNumber)}
                            className={
                              pageNumber === excludedCurrentPage
                                ? "rounded-full bg-stone-900 px-3 py-1 text-white"
                                : "rounded-full border border-stone-200 px-3 py-1"
                            }
                          >
                            {pageNumber}
                          </button>
                        ))}
                        <button
                          type="button"
                          onClick={() =>
                            setExcludedPage((prev) => Math.min(excludedTotalPages, prev + 1))
                          }
                          disabled={excludedCurrentPage === excludedTotalPages}
                          className="rounded-full border border-stone-200 px-3 py-1 disabled:opacity-40"
                        >
                          다음
                        </button>
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <div className="rounded-2xl border border-stone-200 bg-white px-6 py-8 text-center text-sm text-stone-500">
                  제외된 상품이 없습니다.
                </div>
              )
            ) : (
              <div className="rounded-2xl border border-dashed border-stone-200 bg-stone-50 px-6 py-6 text-center text-xs text-stone-500">
                대출 제외 상품 보기를 눌러 제외된 상품과 사유를 확인하세요.
              </div>
            )}
          </div>

          <SimulationSection monthlyPaymentExample={detail.monthlyPaymentExample} />

          <RecommendationListSection
            items={listData?.items ?? []}
            page={listData?.page ?? listPage}
            size={listData?.size ?? listSize}
            total={listData?.total ?? 0}
            onPageChange={setListPage}
          />

          <ActionSection />
        </section>
      </div>
    </main>
  );
};

export default RecommendResultPage;
