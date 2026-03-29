"use client";
// 전역 오류 화면(UI)

type ErrorPageProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

const ErrorPage = ({ error, reset }: ErrorPageProps) => (
  <main style={{ padding: 24 }}>
    <h1>오류가 발생했습니다.</h1>
    <p>{error.message}</p>
    <button type="button" onClick={reset}>
      다시 시도
    </button>
  </main>
);

export default ErrorPage;


