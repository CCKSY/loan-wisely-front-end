// 홈 히어로 섹션
const HomeHeroSection = () => (
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
          나의 꿈<br />
          돈 개많은 백수 
        </div>
        <div className="rounded-2xl border border-stone-200 bg-stone-50 px-5 py-3 text-sm text-stone-600">
          로또 한 10번만 당첨되면 좋겠다...(간단한 설명 들어가는 부분)
        </div>
        <div className="rounded-2xl border border-stone-200 bg-stone-50 px-5 py-4 text-sm text-stone-600">
          아니면 일론 머스크가 갑자기 100억만 주면 좋겠다...(안내 및 주의사항)
        </div>
      </div>
      <div className="flex flex-wrap gap-4">
        <a
          href="/user"
          className="min-w-[180px] rounded-full bg-amber-200 px-6 py-3 text-center text-sm font-semibold text-stone-900 shadow-sm transition hover:-translate-y-0.5 hover:bg-amber-300"
        >
          추천 시작하기는 망할 개나 줘버려
        </a>
        <a
          href="/product"
          className="min-w-[180px] rounded-full border border-stone-400 px-6 py-3 text-center text-sm font-semibold text-stone-900 transition hover:bg-stone-800 hover:text-white"
        >
          전체 상품 조회하기 하하하핳
        </a>
      </div>
    </div>
  </section>
);

export default HomeHeroSection;
