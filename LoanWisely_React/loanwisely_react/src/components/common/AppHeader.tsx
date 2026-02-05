// App header with logo and navigation.
const AppHeader = () => (
  <header className="flex flex-col items-start justify-between gap-4 rounded-[24px] border border-stone-200 bg-white/90 px-4 py-4 shadow-soft-lg sm:flex-row sm:items-center sm:gap-6 sm:rounded-[28px] sm:px-8 sm:py-5">
    <a href="/" className="flex items-center gap-4" aria-label="LoanWisely 홈">
      <div className="grid h-10 w-10 place-items-center rounded-2xl bg-amber-200 text-stone-900 shadow-sm sm:h-12 sm:w-12">
        LW
      </div>
      <div>
        <div className="text-base font-semibold tracking-wide text-stone-900 sm:text-lg">
          LOAN WISELY
        </div>
        <div className="text-xs text-stone-500 sm:text-sm">
          맞춤 금융상품 추천 서비스
        </div>
      </div>
    </a>
    <nav className="w-full sm:w-auto" aria-label="Global">
      <ul className="flex flex-wrap gap-2 text-xs font-medium text-stone-700 sm:gap-3 sm:text-sm">
        {[
          { label: "홈", href: "/" },
          { label: "추천 시작", href: "/user" },
          { label: "전체 상품 조회", href: "/product" },
          { label: "FAQ", href: "/consent" },
        ].map((item) => (
          <li key={item.label}>
            <a
              href={item.href}
              className="rounded-full border border-stone-200 bg-white/90 px-3 py-1.5 transition hover:border-stone-300 hover:text-stone-900 sm:px-4 sm:py-2"
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  </header>
);

export default AppHeader;


