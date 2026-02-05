// 상품 요약 사이드바
const ProductSummarySidebar = () => (
  <aside className="flex h-full flex-col justify-between gap-6 rounded-3xl border border-stone-200 bg-stone-50/70 p-5">
    <div>
      <div className="rounded-2xl border border-stone-200 bg-white px-4 py-2 text-center text-sm font-semibold text-stone-700">
        요약
      </div>
      <div className="mt-4 rounded-2xl border border-stone-200 bg-white px-4 py-4 text-sm text-stone-600">
        상품 상세 정보가 표시됩니다.
      </div>
    </div>
    <button
      type="button"
      className="rounded-full bg-amber-200 px-4 py-3 text-sm font-semibold text-stone-900"
    >
      추천 받으러 가기
    </button>
  </aside>
);

export default ProductSummarySidebar;
