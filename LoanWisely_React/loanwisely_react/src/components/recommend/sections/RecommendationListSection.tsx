type RecommendationListItem = {
  id: string;
  title: string;
  createdAt: string;
  products?: {
    productName: string;
    rate: string;
    limit: string;
    repaymentMethod: string;
  }[];
};

type RecommendationListSectionProps = {
  items: RecommendationListItem[];
  page: number;
  size: number;
  total: number;
  onPageChange: (page: number) => void;
};

const formatRecommendationTitle = (title: string): string => {
  if (!title) return "추천 이력";
  return title.replace(/^Recommendation\s*/i, "추천 이력 ");
};

const formatRateText = (value: string): string => {
  if (!value) return "-";
  const replaced = value.replace(/-?\d+(\.\d+)?/g, (match) => {
    const parsed = Number(match);
    if (Number.isNaN(parsed)) return match;
    if (parsed <= 0) return "";
    return parsed.toFixed(2);
  });
  return replaced.replace(/\s+/g, " ").trim();
};

const RecommendationListSection = ({
  items,
  page,
  size,
  total,
  onPageChange,
}: RecommendationListSectionProps) => {
  const totalPages = Math.max(1, Math.ceil(total / size));
  const canPrev = page > 0;
  const canNext = page + 1 < totalPages;

  return (
    <div className="rounded-3xl border border-stone-200 bg-white px-6 py-5">
      <div className="flex items-center justify-between">
        <div className="text-sm font-semibold text-stone-900">내 추천 목록</div>
        <a href="/user" className="text-xs font-medium text-stone-500 hover:text-stone-700">
          맞춤 추천 시작
        </a>
      </div>

      <div className="mt-3 grid gap-3 text-sm text-stone-600">
        {items.length === 0 ? (
          <div>최근 추천 결과가 없습니다.</div>
        ) : (
          items.map((item) => {
            const products = item.products ?? [];
            return (
              <div
                key={item.id}
                className="rounded-2xl border border-stone-200 bg-stone-50 px-4 py-3"
              >
                <a href={`/recommend?id=${item.id}`} className="flex items-center justify-between">
                  <span className="text-stone-800">{formatRecommendationTitle(item.title)}</span>
                  <span className="text-xs text-stone-400">{item.createdAt}</span>
                </a>

                <div className="mt-3 space-y-2 text-xs text-stone-600">
                  {products.length === 0 ? (
                    <div className="text-stone-400">추천 상품이 없습니다.</div>
                  ) : (
                    products.map((product, index) => (
                      <div
                        key={`${item.id}-${index}`}
                        className="flex flex-wrap items-center gap-2 rounded-xl border border-stone-200 bg-white px-3 py-2"
                      >
                        <span className="font-medium text-stone-700">{product.productName}</span>
                        <span>금리: {formatRateText(product.rate)}</span>
                        <span>한도: {product.limit}</span>
                        <span>상환방법: {product.repaymentMethod}</span>
                      </div>
                    ))
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>

      {totalPages > 1 && (
        <div className="mt-4 flex items-center justify-center gap-3 text-xs text-stone-500">
          <button
            type="button"
            disabled={!canPrev}
            onClick={() => onPageChange(page - 1)}
            className="rounded-full border border-stone-200 px-3 py-1 disabled:opacity-40"
          >
            이전
          </button>
          <span>
            {page + 1} / {totalPages}
          </span>
          <button
            type="button"
            disabled={!canNext}
            onClick={() => onPageChange(page + 1)}
            className="rounded-full border border-stone-200 px-3 py-1 disabled:opacity-40"
          >
            다음
          </button>
        </div>
      )}
    </div>
  );
};

export default RecommendationListSection;
