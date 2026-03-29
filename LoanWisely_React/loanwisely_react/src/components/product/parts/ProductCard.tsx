import type { LoanProduct } from "@/types/product";

const typeLabelMap: Record<string, string> = {
  CREDIT: "신용대출",
  MORTGAGE: "주택담보대출",
  RENT: "전세자금대출",
};

const repaymentLabelMap: Record<string, string> = {
  BULLET: "만기일시상환",
  AMORTIZED: "분할상환",
  FLEX: "혼합상환",
  RPAY_TYPE_S: "분할상환",
  RPAY_TYPE_L: "만기일시상환",
  RPAY_TYPE_M: "혼합상환",
};

// 개별 상품 카드
const ProductCard = ({
  product,
  onSelect,
  isActive,
}: {
  product: LoanProduct;
  onSelect?: (product: LoanProduct) => void;
  isActive?: boolean;
}) => {
  const productType =
    (product.productTypeCodeValueId &&
      typeLabelMap[product.productTypeCodeValueId]) ||
    product.productTypeCodeValueId ||
    "상품 정보";
  const repaymentType =
    (product.repaymentTypeCodeValueId &&
      repaymentLabelMap[product.repaymentTypeCodeValueId]) ||
    product.repaymentTypeCodeValueId ||
    "상환 방식";
  const lender = product.companyName || "금융사";

  return (
    <article
      className={
        isActive
          ? "rounded-3xl border border-amber-200 bg-white px-5 py-5 shadow-sm ring-1 ring-amber-100"
          : "rounded-3xl border border-stone-200 bg-white px-5 py-5 shadow-sm"
      }
      role="button"
      tabIndex={0}
      onClick={() => onSelect?.(product)}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onSelect?.(product);
        }
      }}
    >
      <div className="flex items-center gap-3">
        <div className="grid h-10 w-10 place-items-center rounded-xl bg-stone-100 text-xs font-semibold text-stone-600">
          LW
        </div>
        <div>
          <div className="text-xs text-stone-500">{lender}</div>
          <div className="text-sm font-semibold text-stone-900">
            {product.productName}
          </div>
        </div>
      </div>
      <div className="mt-4 text-xs text-stone-600">{productType}</div>
      <div className="mt-1 text-xs text-stone-600">상환 방식: {repaymentType}</div>
      <div className="mt-1 text-xs text-stone-600">
        가입 방법: {product.joinWay || "정보 없음"}
      </div>
      {product.note ? (
        <div className="mt-3 line-clamp-2 text-xs text-stone-500">
          {product.note}
        </div>
      ) : null}
      <button
        type="button"
        className="mt-4 w-full rounded-full border border-stone-300 px-4 py-2 text-sm text-stone-700"
      >
        상세 정보 보기
      </button>
    </article>
  );
};

export default ProductCard;
