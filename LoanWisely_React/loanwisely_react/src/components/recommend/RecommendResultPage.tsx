"use client";

import AppHeader from "@/components/common/AppHeader";

import { useRecommendResult } from "@/hooks/useRecommendResult";

const levelBadgeClass = (status: "full" | "partial" | "empty") => {
  if (status === "full") {
    return "bg-emerald-200 text-emerald-900";
  }
  if (status === "partial") {
    return "bg-amber-200 text-amber-900";
  }
  return "bg-stone-200 text-stone-700";
};

const RecommendResultPage = () => {
  const { data } = useRecommendResult();

  const explain = data?.explain ?? {
    summary: "추천에 사용된 입력 요약이 표시됩니다.",
    levelUsed: "LV1",
    levelStatus: "empty",
  };

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

        <section className="grid gap-6 rounded-[32px] border border-stone-200 bg-white/90 p-8 shadow-soft-lg lg:grid-cols-[minmax(0,1fr)_minmax(260px,340px)]">
          <div className="flex flex-col gap-6">
            <div>
              <h1 className="text-3xl font-semibold text-stone-900">
                맞춤 추천 결과
              </h1>
              <p className="mt-2 text-sm text-stone-600">
                입력하신 정보를 바탕으로 추천된 상품 결과입니다.
              </p>
            </div>

            <div className="rounded-3xl border border-stone-200 bg-stone-50 px-6 py-5">
              <div className="flex items-center gap-3">
                <div className="text-sm font-semibold text-stone-900">
                  추천 기준 요약
                </div>
                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${levelBadgeClass(
                    explain.levelStatus,
                  )}`}
                >
                  {explain.levelUsed}
                </span>
              </div>
              <p className="mt-3 text-sm text-stone-600">{explain.summary}</p>
            </div>

            <div className="grid gap-4">
              {products.map((product) => (
                <article
                  key={product.id}
                  className="rounded-3xl border border-stone-200 bg-white px-6 py-5 shadow-sm"
                >
                  <div className="flex items-start justify-between gap-6">
                    <div>
                      <div className="text-xs text-stone-500">
                        {product.lenderName}
                      </div>
                      <h2 className="text-lg font-semibold text-stone-900">
                        {product.productName}
                      </h2>
                      <div className="mt-2 text-sm text-stone-600">
                        {product.rate}
                      </div>
                      <div className="text-sm text-stone-600">
                        {product.limit}
                      </div>
                    </div>
                    <button
                      type="button"
                      className="h-10 rounded-full border border-stone-400 px-4 text-sm font-semibold text-stone-700"
                    >
                      상세 보기
                    </button>
                  </div>
                  <div className="mt-4 grid gap-2 text-sm text-stone-600">
                    <div>
                      <span className="font-semibold text-stone-800">추천 사유:</span>{" "}
                      {product.reason}
                    </div>
                    <div>
                      <span className="font-semibold text-stone-800">적합도:</span>{" "}
                      {product.suitabilityScore}점
                    </div>
                  </div>
                  <div className="mt-4 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-xs text-amber-900">
                    {product.riskNote}
                  </div>
                </article>
              ))}
            </div>
          </div>

          <aside className="flex h-full flex-col justify-between gap-6 rounded-3xl border border-stone-200 bg-stone-50/70 p-5">
            <div className="rounded-2xl border border-stone-200 bg-white px-4 py-2 text-center text-sm font-semibold text-stone-700">
              상세 정보
            </div>
            <div className="grid gap-4">
              <div className="rounded-2xl border border-stone-200 bg-white px-4 py-4 text-sm text-stone-600">
                {detail.description}
              </div>
              <div className="rounded-2xl border border-stone-200 bg-white px-4 py-4 text-sm text-stone-600">
                {detail.monthlyPaymentExample}
              </div>
              <div className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-4 text-xs text-amber-900">
                {detail.riskWarning}
              </div>
            </div>
          </aside>
        </section>
      </div>
    </main>
  );
};

export default RecommendResultPage;

