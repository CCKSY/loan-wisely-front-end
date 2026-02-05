// 추천 결과 상단 타이틀 섹션
type RecommendHeroSectionProps = {
  hasId: boolean;
  isLoading: boolean;
};

const RecommendHeroSection = ({ hasId, isLoading }: RecommendHeroSectionProps) => (
  <div className="flex flex-col gap-6">
    <div>
      <h1 className="text-3xl font-semibold text-stone-900">맞춤 추천 결과</h1>
      <p className="mt-2 text-sm text-stone-600">
        입력하신 정보를 바탕으로 추천된 상품 결과입니다.
      </p>
    </div>

    {!hasId && (
      <div className="rounded-3xl border border-stone-200 bg-stone-50 px-6 py-5 text-sm text-stone-600">
        추천 결과 ID가 없어 데모 화면을 표시합니다.
      </div>
    )}

    {isLoading && hasId && (
      <div className="rounded-3xl border border-stone-200 bg-stone-50 px-6 py-5 text-sm text-stone-600">
        추천 결과를 불러오는 중입니다.
      </div>
    )}
  </div>
);

export default RecommendHeroSection;
