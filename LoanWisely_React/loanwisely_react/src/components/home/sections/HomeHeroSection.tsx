// 홈 히어로 섹션
const HomeHeroSection = () => (
  <section className="relative overflow-hidden rounded-[36px] border border-[var(--lw-border)] bg-white/92 p-8 shadow-[var(--lw-shadow)] lg:p-12">
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(241,232,219,0.6),transparent_55%),radial-gradient(circle_at_bottom_left,rgba(236,225,210,0.5),transparent_50%)]" />
    <div className="absolute -left-16 top-10 h-56 w-56 rounded-full border border-[#efe5d8] bg-white/70" />
    <div className="absolute -right-20 bottom-6 h-72 w-72 rounded-full border border-[#efe5d8] bg-white/70" />
    <div className="relative grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
      <div className="flex flex-col justify-between gap-8">
        <div className="flex flex-col gap-5">
          <span className="w-fit rounded-full border border-[#eadfce] bg-[#f6f1ea] px-4 py-1 text-xs font-semibold text-[var(--lw-accent-ink)]">
            맞춤형 대출 안내
          </span>
          <h1 className="text-3xl font-semibold leading-tight text-[var(--lw-ink)] lg:text-4xl">
            내 상황에 맞는 대출 상품을
            <br />
            차분하고 명확하게 비교하세요
          </h1>
          <p className="text-sm text-[var(--lw-muted)] lg:text-base">
            입력한 정보로 금리, 한도, 상환 방식까지 한눈에 정리해드립니다. 신뢰할 수 있는 기준으로
            조건을 비교하고 필요한 상품을 빠르게 찾을 수 있습니다.
          </p>
        </div>
        <div className="grid gap-3 lg:grid-cols-3">
          <div className="rounded-2xl border border-[var(--lw-border)] bg-white px-4 py-3 text-sm text-[var(--lw-muted)]">
            금융사 기준으로 정리된
            <br />
            상품 핵심 요약
          </div>
          <div className="rounded-2xl border border-[var(--lw-border)] bg-white px-4 py-3 text-sm text-[var(--lw-muted)]">
            금리·한도·상환 방식
            <br />
            자동 비교
          </div>
          <div className="rounded-2xl border border-[var(--lw-border)] bg-white px-4 py-3 text-sm text-[var(--lw-muted)]">
            조건별 적합도
            <br />
            우선순위 제안
          </div>
        </div>
        <div className="flex flex-wrap gap-4">
          <a
            href="/user"
            className="min-w-[200px] rounded-full bg-[#ede2d1] px-6 py-3 text-center text-sm font-semibold text-[var(--lw-ink)] shadow-sm transition hover:-translate-y-0.5 hover:bg-[#e2d5c2]"
          >
            맞춤 추천 시작하기
          </a>
          <a
            href="/product"
            className="min-w-[200px] rounded-full border border-[var(--lw-border)] bg-white px-6 py-3 text-center text-sm font-semibold text-[var(--lw-ink)] transition hover:border-stone-300 hover:bg-stone-900 hover:text-white"
          >
            전체 상품 둘러보기
          </a>
        </div>
        <div className="rounded-2xl border border-[var(--lw-border)] bg-[#faf7f3] px-5 py-4 text-xs text-[var(--lw-muted)] lg:text-sm">
          제공되는 정보는 비교용이며, 실제 승인 조건은 금융기관 심사에 따라 달라질 수 있습니다.
        </div>
      </div>
      <div className="relative flex h-full items-center justify-center">
        <div className="relative flex w-full max-w-md flex-col items-center gap-6 rounded-3xl border border-[var(--lw-border)] bg-gradient-to-br from-[#faf6f0] via-white to-[#f1ebe3] px-8 py-10">
          <div className="absolute inset-6 rounded-[28px] border border-[#efe5d8]" />
          <div className="absolute -top-6 right-10 h-20 w-20 rounded-full bg-[#f4ede4] blur-2xl" />
          <div className="absolute -bottom-8 left-8 h-24 w-24 rounded-full bg-[#efe6da] blur-2xl" />
          <div className="relative flex flex-col items-center gap-4">
            <div className="flex h-36 w-36 items-center justify-center rounded-full border border-[#e9dece] bg-white shadow-sm">
              <img
                src="/loanie_누끼.png"
                alt="LoanWisely 마스코트"
                className="h-24 w-24 object-contain"
              />
            </div>
            <div className="text-center">
              <p className="text-sm font-semibold text-[var(--lw-ink)]">Loanie와 함께</p>
              <p className="text-xs text-[var(--lw-muted)]">안정적인 대출 길찾기</p>
            </div>
          </div>
          <div className="grid w-full gap-3 text-xs text-[var(--lw-muted)]">
            <div className="flex items-center justify-between rounded-full border border-[#eadfce] bg-white/90 px-4 py-2">
              <span>추천 기준</span>
              <span className="font-semibold text-[var(--lw-ink)]">정책 + 점수</span>
            </div>
            <div className="flex items-center justify-between rounded-full border border-[#eadfce] bg-white/90 px-4 py-2">
              <span>비교 범위</span>
              <span className="font-semibold text-[var(--lw-ink)]">금리 · 한도 · 상환</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default HomeHeroSection;
