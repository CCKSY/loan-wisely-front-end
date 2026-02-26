"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import AppHeader from "@/components/common/AppHeader";
import { useUserLogin } from "@/hooks/useUserLogin";

const LoginPage = () => {
  const router = useRouter();
  const loginMutation = useUserLogin();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await loginMutation.mutateAsync({ username, password });
      router.push("/");
    } catch {
      // handled by UI
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-stone-100 via-stone-100 to-amber-50 px-4 py-8 sm:px-8 sm:py-10 lg:px-16 lg:py-14">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 sm:gap-8">
        <div className="mx-auto w-full max-w-3xl">
          <AppHeader variant="compact" />
        </div>

        <section className="mx-auto w-full max-w-3xl rounded-[28px] border border-stone-200 bg-white/90 p-6 shadow-soft-lg sm:p-8">
          <h1 className="text-xl font-semibold text-stone-900 sm:text-2xl">
            사용자 로그인
          </h1>
          <p className="mt-2 text-sm text-stone-600">
            추천을 받으려면 로그인 후 진행해 주세요.
          </p>

          <form onSubmit={onSubmit} className="mt-6 space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-stone-700">아이디</label>
              <input
                className="w-full rounded-2xl border border-stone-200 bg-white px-4 py-3 text-sm text-stone-900 focus:border-stone-400 focus:outline-none"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="user1"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-stone-700">비밀번호</label>
              <input
                className="w-full rounded-2xl border border-stone-200 bg-white px-4 py-3 text-sm text-stone-900 focus:border-stone-400 focus:outline-none"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="pass1234*"
                required
              />
            </div>

            {loginMutation.isError ? (
              <p className="text-sm text-rose-600">로그인에 실패했습니다.</p>
            ) : null}

            <button
              type="submit"
              className="w-full rounded-2xl bg-stone-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-stone-800"
              disabled={loginMutation.isPending}
            >
              {loginMutation.isPending ? "로그인 중..." : "로그인"}
            </button>
          </form>
        </section>
      </div>
    </main>
  );
};

export default LoginPage;
