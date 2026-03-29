"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";

import { verifyUser } from "@/api/authApi";
import { clearAccessToken, getAccessToken, getAccessTokenExpiry } from "@/infra/auth";

type AppHeaderProps = {
  variant?: "default" | "compact";
};

const AppHeader = ({ variant = "default" }: AppHeaderProps) => {
  const [hasToken, setHasToken] = useState(false);

  useEffect(() => {
    const token = getAccessToken();
    if (!token) {
      setHasToken(false);
      return;
    }

    const expiresAt = getAccessTokenExpiry();
    if (expiresAt !== null && Date.now() >= expiresAt) {
      clearAccessToken();
      setHasToken(false);
      return;
    }

    setHasToken(true);
    verifyUser()
      .then(() => setHasToken(true))
      .catch(() => {
        clearAccessToken();
        setHasToken(false);
      });
  }, []);

  const pathname = usePathname();
  const loginHref = useMemo(() => {
    if (!pathname) return "/login";
    return `/login?redirect=${encodeURIComponent(pathname)}`;
  }, [pathname]);

  const handleLogout = () => {
    clearAccessToken();
    setHasToken(false);
  };

  const links = [
    { label: "홈", href: "/" },
    { label: "추천 시작", href: "/user" },
    { label: "전체 상품 조회", href: "/product" },
    { label: "FAQ", href: "/consent" },
  ];

  const isCompact = variant === "compact";

  return (
    <header
      className={
        isCompact
          ? "rounded-[22px] border border-[var(--lw-border)] bg-white/90 px-4 py-4 shadow-[var(--lw-shadow)] sm:px-7 sm:py-5"
          : "flex flex-col items-start justify-between gap-4 rounded-[22px] border border-[var(--lw-border)] bg-white/90 px-4 py-4 shadow-[var(--lw-shadow)] sm:flex-row sm:items-center sm:gap-6 sm:px-7 sm:py-5"
      }
    >
      <Link href="/" className="flex items-center gap-4" aria-label="LoanWisely">
        <div className="grid h-10 w-10 place-items-center rounded-2xl bg-[#f4ecdf] shadow-sm sm:h-12 sm:w-12">
          <img
            src="/loanie_%EB%88%84%EB%81%BC.png"
            alt="Loanie"
            className="h-7 w-7 object-contain sm:h-9 sm:w-9"
          />
        </div>
        <div>
          <div className="text-base font-semibold tracking-wide text-stone-900 sm:text-lg">
            LOAN WISELY
          </div>
          <div className="text-xs text-stone-500 sm:text-sm">
            당신의 현명한 대출 파트너
          </div>
        </div>
      </Link>

      {variant === "default" ? (
        <nav className="w-full sm:ml-auto sm:w-auto" aria-label="Global">
          <ul className="flex flex-wrap items-center gap-2 text-xs font-medium text-stone-700 sm:flex-nowrap sm:justify-end sm:gap-3 sm:text-sm">
            {links.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className="whitespace-nowrap rounded-full border border-[var(--lw-border)] bg-white px-3 py-1.5 text-[var(--lw-ink)] transition hover:border-stone-300 hover:bg-stone-50 sm:px-4 sm:py-2"
                >
                  {item.label}
                </Link>
              </li>
            ))}

            <li>
              {hasToken ? (
                <button
                  type="button"
                  onClick={handleLogout}
                  className="whitespace-nowrap rounded-full border border-[var(--lw-border)] bg-white px-3 py-1.5 text-[var(--lw-ink)] transition hover:border-stone-300 hover:bg-stone-50 sm:px-4 sm:py-2"
                >
                  로그아웃
                </button>
              ) : (
                <Link
                  href={loginHref}
                  className="whitespace-nowrap rounded-full border border-[var(--lw-border)] bg-white px-3 py-1.5 text-[var(--lw-ink)] transition hover:border-stone-300 hover:bg-stone-50 sm:px-4 sm:py-2"
                >
                  로그인
                </Link>
              )}
            </li>

            {!hasToken ? (
              <li>
                <Link
                  href="/signup"
                  className="whitespace-nowrap rounded-full border border-[var(--lw-border)] bg-[#f4ecdf] px-3 py-1.5 text-[var(--lw-ink)] transition hover:border-stone-300 hover:bg-[#efe5d7] sm:px-4 sm:py-2"
                >
                  회원가입
                </Link>
              </li>
            ) : null}
          </ul>
        </nav>
      ) : null}
    </header>
  );
};

export default AppHeader;
