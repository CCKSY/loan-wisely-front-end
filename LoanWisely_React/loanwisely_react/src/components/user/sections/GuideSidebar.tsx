// 입력 가이드 사이드바
const GuideSidebar = () => (
  <aside className="rounded-3xl border border-stone-200 bg-stone-50 p-4 sm:p-5">
    <div className="rounded-2xl border border-stone-200 bg-white px-4 py-2 text-center text-sm font-semibold text-stone-700">
      가이드 & 중요 안내
    </div>
    <div className="mt-4 rounded-2xl border border-stone-200 bg-white px-4 py-4 text-sm text-stone-600">
      입력 항목별 가이드 및 주의사항을 안내합니다.
    </div>
    <div className="mt-4 rounded-2xl border border-stone-200 bg-white px-4 py-4 text-sm text-stone-600">
      입력 레벨이 결과 안내 범위에 미치는 영향이 표시됩니다.
    </div>
  </aside>
);

export default GuideSidebar;
