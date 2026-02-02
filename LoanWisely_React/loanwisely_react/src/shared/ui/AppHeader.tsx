const AppHeader = () => (
  <header className="flex flex-wrap items-center justify-between gap-6 rounded-[28px] border border-stone-200 bg-white/90 px-8 py-5 shadow-soft-lg">
    <a href="/" className="flex items-center gap-4" aria-label="LoanWisely 홈">
      <div className="grid h-12 w-12 place-items-center rounded-2xl bg-amber-200 text-stone-900 shadow-sm">
        LW
      </div>
      <div>
        <div className="text-lg font-semibold tracking-wide text-stone-900">
          LOAN WISELY
        </div>
        <div className="text-sm text-stone-500">맞춤 금융상품 추천 서비스</div>
      </div>
    </a>
    <nav aria-label="Global">
      <ul className="flex flex-wrap gap-3 text-sm font-medium text-stone-700">
        {[
          { label: "홈", href: "/" },
          { label: "추천 시작", href: "/user" },
          { label: "전체 상품 조회", href: "/product" },
          { label: "FAQ", href: "/consent" },
        ].map((item) => (
          <li key={item.label}>
            <a
              href={item.href}
              className="rounded-full border border-stone-200 bg-white/90 px-4 py-2 transition hover:border-stone-300 hover:text-stone-900"
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
