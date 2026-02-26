// 추천 결과 페이지 진입점
import { Suspense } from "react";

import RecommendResultPage from "@/components/recommend/RecommendResultPage";

const RecommendPage = () => (
  <Suspense fallback={<div className="px-8 py-10 text-stone-600">로딩 중...</div>}>
    <RecommendResultPage />
  </Suspense>
);

export default RecommendPage;



