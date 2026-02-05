// 상품 목록 필터 바
const ProductFilterBar = () => (
  <div className="flex flex-wrap items-center gap-3 rounded-2xl border border-stone-200 bg-stone-50 px-4 py-3">
    <button
      type="button"
      className="rounded-full border border-stone-300 bg-white px-4 py-2 text-sm text-stone-700"
    >
      대출상품유형 ▾
    </button>
    <button
      type="button"
      className="rounded-full border border-stone-300 bg-white px-4 py-2 text-sm text-stone-700"
    >
      소득1 ▾
    </button>
    <button
      type="button"
      className="rounded-full border border-stone-300 bg-white px-4 py-2 text-sm text-stone-700"
    >
      소득2 ▾
    </button>
    <div className="flex-1" />
    <button
      type="button"
      className="rounded-full bg-amber-200 px-5 py-2 text-sm font-semibold text-stone-900"
    >
      조회 하기
    </button>
  </div>
);

export default ProductFilterBar;
