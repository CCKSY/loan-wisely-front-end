// 추천 결과 하단 액션 섹션
const ActionSection = () => (
  <div className="flex flex-wrap gap-3">
    <a
      href="/user"
      className="rounded-full border border-stone-300 px-6 py-2 text-sm text-stone-700"
    >
      조건 조정
    </a>
    <a
      href="/"
      className="rounded-full bg-amber-200 px-6 py-2 text-sm font-semibold text-stone-900"
    >
      홈으로
    </a>
  </div>
);

export default ActionSection;
