"use client";

const EsSearchPage = () => (
  <main className="px-8 py-10">
    <h1 className="text-2xl font-semibold text-stone-900">ES 검색</h1>
    <p className="mt-3 text-stone-600">
      관리자 추천 검색 화면입니다. 현재는 프론트에서 기본 페이지로 대체했습니다.
    </p>
    <div className="mt-6 flex flex-wrap gap-3">
      <a
        className="rounded bg-stone-900 px-4 py-2 text-white"
        href="/recommend"
      >
        추천 결과 보기
      </a>
      <a
        className="rounded border border-stone-300 px-4 py-2 text-stone-700"
        href="/"
      >
        홈으로
      </a>
    </div>
  </main>
);

export default EsSearchPage;
