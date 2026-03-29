"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import AppHeader from "@/components/common/AppHeader";
import { useUserRegister } from "@/hooks/useUserRegister";

const MIN_USERNAME_LENGTH = 6;
const PASSWORD_RULE = /^(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;

const SignupPage = () => {
  const router = useRouter();
  const registerMutation = useUserRegister();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [validationMessage, setValidationMessage] = useState<string | null>(null);

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const trimmedUsername = username.trim();
    if (trimmedUsername.length < MIN_USERNAME_LENGTH) {
      setValidationMessage("아이디는 6자리 이상이어야 합니다.");
      return;
    }
    if (!PASSWORD_RULE.test(password)) {
      setValidationMessage(
        "비밀번호는 8자리 이상이며 소문자, 숫자, 특수기호를 포함해야 합니다.",
      );
      return;
    }
    setValidationMessage(null);
    try {
      await registerMutation.mutateAsync({ username: trimmedUsername, password });
      router.push("/login");
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
            사용자 회원가입
          </h1>
          <p className="mt-2 text-sm text-stone-600">
            가입 후 로그인해서 추천을 진행할 수 있습니다.
          </p>

          <form onSubmit={onSubmit} className="mt-6 space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-stone-700">아이디</label>
              <input
                className="w-full rounded-2xl border border-stone-200 bg-white px-4 py-3 text-sm text-stone-900 focus:border-stone-400 focus:outline-none"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                  if (validationMessage) setValidationMessage(null);
                }}
                placeholder="user001"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-stone-700">비밀번호</label>
              <input
                className="w-full rounded-2xl border border-stone-200 bg-white px-4 py-3 text-sm text-stone-900 focus:border-stone-400 focus:outline-none"
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (validationMessage) setValidationMessage(null);
                }}
                placeholder="pass1234*"
                required
              />
              <p className="text-xs text-stone-500">
                아이디 6자리 이상 / 비밀번호 8자리 이상(소문자, 숫자, 특수기호 포함)
              </p>
            </div>

            {validationMessage ? (
              <p className="text-sm text-rose-600">{validationMessage}</p>
            ) : null}
            {registerMutation.isError ? (
              <p className="text-sm text-rose-600">회원가입에 실패했습니다.</p>
            ) : null}

            <button
              type="submit"
              className="w-full rounded-2xl bg-stone-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-stone-800"
              disabled={registerMutation.isPending}
            >
              {registerMutation.isPending ? "가입 중.." : "회원가입"}
            </button>
          </form>
        </section>
      </div>
    </main>
  );
};

export default SignupPage;
