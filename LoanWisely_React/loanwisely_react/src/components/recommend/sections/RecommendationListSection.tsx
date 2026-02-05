// 추천 목록(내 추천) 섹션
type RecommendationListItem = {
  id: string;
  title: string;
  createdAt: string;
};

type RecommendationListSectionProps = {
  items: RecommendationListItem[];
};

const RecommendationListSection = ({ items }: RecommendationListSectionProps) => (
  <div className="rounded-3xl border border-stone-200 bg-white px-6 py-5">
    <div className="flex items-center justify-between">
      <div className="text-sm font-semibold text-stone-900">내 추천 목록</div>
      <a href="/user" className="text-xs font-medium text-stone-500 hover:text-stone-700">
        맞춤추천 시작
      </a>
    </div>
    <div className="mt-3 grid gap-2 text-sm text-stone-600">
      {items.length === 0 ? (
        <div>최근 추천 결과가 없습니다.</div>
      ) : (
        items.map((item) => (
          <a
            key={item.id}
            href={`/recommend?id=${item.id}`}
            className="flex items-center justify-between rounded-2xl border border-stone-200 bg-stone-50 px-3 py-2"
          >
            <span className="text-stone-800">{item.title}</span>
            <span className="text-xs text-stone-400">{item.createdAt}</span>
          </a>
        ))
      )}
    </div>
  </div>
);

export default RecommendationListSection;
