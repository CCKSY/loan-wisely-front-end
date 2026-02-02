import AppHeader from "@/shared/ui/AppHeader";

const ProductPage = () => (
  <main className="min-h-screen bg-gradient-to-br from-stone-100 via-stone-100 to-amber-50 px-16 py-14">
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-9">
      <AppHeader />

      <section className="grid gap-6 rounded-[32px] border border-stone-200 bg-white/90 p-8 shadow-soft-lg lg:grid-cols-[minmax(0,1fr)_minmax(260px,340px)]">
        <div className="flex flex-col gap-6">
          <div>
            <h1 className="text-3xl font-semibold text-stone-900">
              전체 금융 상품 조회
            </h1>
            <p className="mt-2 text-sm text-stone-600">
              전체 상품을 대출사, 대출 종류, 최대 한도 등으로 정렬할 수 있습니다.
            </p>
          </div>

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

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {[1, 2, 3].map((item) => (
              <article
                key={item}
                className="rounded-3xl border border-stone-200 bg-white px-5 py-5 shadow-sm"
              >
                <div className="flex items-center gap-3">
                  <div className="grid h-10 w-10 place-items-center rounded-xl bg-stone-100 text-xs text-stone-600">
                    아이콘
                  </div>
                  <div>
                    <div className="text-xs text-stone-500">대출사명</div>
                    <div className="text-sm font-semibold text-stone-900">
                      대출 상품명
                    </div>
                  </div>
                </div>
                <div className="mt-4 text-sm font-semibold text-stone-900">
                  대출 상품명
                </div>
                <div className="mt-2 text-xs text-stone-600">
                  금리 월 6.2%
                </div>
                <div className="text-xs text-stone-600">
                  최대 한도 500만원
                </div>
                <button
                  type="button"
                  className="mt-4 w-full rounded-full border border-stone-300 px-4 py-2 text-sm text-stone-700"
                >
                  상세 정보 보기
                </button>
              </article>
            ))}
          </div>
        </div>

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
      </section>

      <footer className="rounded-[28px] border border-stone-200 bg-white/85 px-8 py-5 text-xs text-stone-600 shadow-soft-lg">
        <div className="flex flex-wrap gap-4 pb-2 text-sm font-medium text-stone-700">
          <a href="#" className="hover:text-stone-900">
            이용약관
          </a>
          <a href="#" className="hover:text-stone-900">
            개인정보처리방침
          </a>
          <a href="#" className="hover:text-stone-900">
            고객센터
          </a>
        </div>
        <p>
          본 서비스는 입력된 정보를 기반으로 금융상품을 추천하는 가이드이며,
          추천 결과는 금융기관의 실제 심사 결과와 다를 수 있습니다.
        </p>
      </footer>
    </div>
  </main>
);

export default ProductPage;
