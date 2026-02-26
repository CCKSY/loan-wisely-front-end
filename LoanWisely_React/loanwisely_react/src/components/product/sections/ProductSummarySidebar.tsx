import type { LoanProduct } from "@/types/product";

type ProductSummarySidebarProps = {
  product?: LoanProduct | null;
};

const labelMap: Record<keyof LoanProduct, string> = {
  productId: "상품 ID",
  providerId: "금융사 ID",
  productName: "상품명",
  companyName: "금융사명",
  productTypeCodeValueId: "상품 유형",
  loanTypeCodeValueId: "대출 유형",
  repaymentTypeCodeValueId: "상환 방식",
  collateralTypeCodeValueId: "담보 유형",
  rateTypeCodeValueId: "금리 유형",
  note: "상품 안내",
  finPrdtCd: "상품 코드",
  finCoNo: "금융사 코드",
  joinWay: "가입 방법",
  cbName: "CB 명",
  addDate: "공시일",
  endDate: "종료일",
  updatedAt: "갱신일",
};

const rateTypeLabelMap: Record<string, string> = {
  RATE_TYPE_F: "고정금리",
  RATE_TYPE_V: "변동금리",
  RATE_TYPE_M: "혼합금리",
};

const repaymentLabelMap: Record<string, string> = {
  BULLET: "만기일시상환",
  AMORTIZED: "분할상환",
  FLEX: "혼합상환",
  RPAY_TYPE_S: "분할상환",
  RPAY_TYPE_L: "만기일시상환",
  RPAY_TYPE_M: "혼합상환",
};

const loanTypeLabelMap: Record<string, string> = {
  LOAN_TYPE_CREDIT: "신용대출",
  LOAN_TYPE_MORTGAGE: "주택담보대출",
  LOAN_TYPE_RENT: "전세자금대출",
  CREDIT: "신용대출",
  MORTGAGE: "주택담보대출",
  RENT: "전세자금대출",
};

const formatDateValue = (value: string): string => {
  if (!value) {
    return value;
  }
  const trimmed = value.trim();
  if (trimmed.length >= 10) {
    return trimmed.slice(0, 10);
  }
  return trimmed;
};

// 상품 요약 사이드바
const ProductSummarySidebar = ({ product }: ProductSummarySidebarProps) => {
  const hasProduct = Boolean(product);
  const entries = product
    ? (Object.entries(product) as Array<[keyof LoanProduct, LoanProduct[keyof LoanProduct]]>)
        .filter(([, value]) => value !== null && value !== undefined && String(value).trim() !== "")
        .filter(([key]) => !["productId", "providerId", "finCoNo"].includes(String(key)))
        .map(([key, value]) => ({
          key,
          label: labelMap[key] ?? String(key),
          value:
            key === "rateTypeCodeValueId"
              ? rateTypeLabelMap[String(value)] ?? String(value)
              : key === "repaymentTypeCodeValueId"
              ? repaymentLabelMap[String(value)] ?? String(value)
              : key === "loanTypeCodeValueId"
              ? loanTypeLabelMap[String(value)] ?? String(value)
              : key === "addDate" || key === "updatedAt"
              ? formatDateValue(String(value))
              : String(value),
        }))
    : [];

  return (
    <aside className="flex flex-col gap-6 rounded-3xl border border-stone-200 bg-stone-50/70 p-5">
      <div>
        <div className="rounded-2xl border border-stone-200 bg-white px-4 py-2 text-center text-sm font-semibold text-stone-700">
          요약
        </div>
        <div className="mt-4 rounded-2xl border border-stone-200 bg-white px-4 py-4 text-sm text-stone-600">
          {hasProduct ? (
            <div className="flex flex-col gap-2">
              {entries.map((item) => (
                <div key={item.key} className="flex flex-col gap-1 text-xs">
                  <span className="text-stone-500">{item.label}</span>
                  <span className="text-stone-900">{item.value}</span>
                </div>
              ))}
            </div>
          ) : (
            "상품 카드를 선택하면 상세 정보가 표시됩니다."
          )}
        </div>
      </div>
      <a
        href="/user"
        className="rounded-full bg-amber-200 px-4 py-3 text-center text-sm font-semibold text-stone-900"
      >
        추천 받으러 가기
      </a>
    </aside>
  );
};

export default ProductSummarySidebar;
