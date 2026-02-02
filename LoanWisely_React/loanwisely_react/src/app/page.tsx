import AppHeader from "@/shared/ui/AppHeader";

const HomePage = () => (
  <main className="min-h-screen bg-gradient-to-br from-stone-100 via-stone-100 to-amber-50 px-16 py-14">
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-6">
      <AppHeader />

      <section className="grid items-stretch gap-8 rounded-[36px] border border-stone-200 bg-white/85 p-10 shadow-soft-lg lg:grid-cols-[minmax(300px,1.1fr)_minmax(380px,1.5fr)]">
        <div className="flex h-full items-center justify-center rounded-3xl border border-stone-200 bg-gradient-to-b from-white to-stone-100 p-4">
          <img
            src="/loanie_누끼.png"
            alt="LoanWisely 마스코트"
            className="h-auto max-h-80 w-auto object-contain"
          />
        </div>
        <div className="flex h-full flex-col justify-between gap-5">
          <div className="flex flex-col gap-5">
            <div className="rounded-3xl border border-stone-200 bg-white px-7 py-6 text-3xl font-semibold leading-tight text-stone-900">
              캐치프레이즈가<br />
              들어갈 곳입니당
            </div>
            <div className="rounded-2xl border border-stone-200 bg-stone-50 px-5 py-3 text-sm text-stone-600">
              간단한 설명 문구가 들어갈 곳이에요
            </div>
            <div className="rounded-2xl border border-stone-200 bg-stone-50 px-5 py-4 text-sm text-stone-600">
              안내 및 주의사항이 들어갈 곳이에요
            </div>
          </div>
          <div className="flex flex-wrap gap-4">
            <a
              href="/user"
              className="min-w-[180px] rounded-full bg-amber-200 px-6 py-3 text-center text-sm font-semibold text-stone-900 shadow-sm transition hover:-translate-y-0.5 hover:bg-amber-300"
            >
              추천 시작하기
            </a>
            <a
              href="/product"
              className="min-w-[180px] rounded-full border border-stone-400 px-6 py-3 text-center text-sm font-semibold text-stone-900 transition hover:bg-stone-800 hover:text-white"
            >
              전체 상품 조회하기
            </a>
          </div>
        </div>
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

export default HomePage;
