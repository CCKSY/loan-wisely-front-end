// 개별 상품 카드
const ProductCard = () => (
  <article className="rounded-3xl border border-stone-200 bg-white px-5 py-5 shadow-sm">
    <div className="flex items-center gap-3">
      <div className="grid h-10 w-10 place-items-center rounded-xl bg-stone-100 text-xs text-stone-600">
        아이콘
      </div>
      <div>
        <div className="text-xs text-stone-500">대출사명</div>
        <div className="text-sm font-semibold text-stone-900">대출 상품명</div>
      </div>
    </div>
    <div className="mt-4 text-sm font-semibold text-stone-900">대출 상품명</div>
    <div className="mt-2 text-xs text-stone-600">금리 월 6.2%</div>
    <div className="text-xs text-stone-600">최대 한도 500만원</div>
    <button
      type="button"
      className="mt-4 w-full rounded-full border border-stone-300 px-4 py-2 text-sm text-stone-700"
    >
      상세 정보 보기
    </button>
  </article>
);

export default ProductCard;
