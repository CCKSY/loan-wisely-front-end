"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

import AppHeader from "@/shared/ui/AppHeader";

import { useUserInputSubmit } from "../hooks/useUserInputSubmit";
import type { UserInputPayload } from "../types";

type Level = 1 | 2 | 3;

type LevelMeta = {
  title: string;
  description: string;
};

type FormValues = {
  age: number | null;
  annualIncome: number | null;
  gender: "male" | "female" | "";
  employmentStatus: string;
  residenceType: string;
  loanPurpose: string;
  totalDebtAmount: number | null;
  loanCount: number | null;
  consent: boolean;
};

const levelMeta: Record<Level, LevelMeta> = {
  1: {
    title: "Lv.1 필수 정보",
    description: "기본 개인정보를 입력합니다.",
  },
  2: {
    title: "Lv.2 선택 정보",
    description: "선택 정보를 입력합니다.",
  },
  3: {
    title: "Lv.3 추가 정보",
    description: "추가 정보 입력 및 동의를 진행합니다.",
  },
};

const emptyToNull = (value: string): string | null =>
  value.trim() === "" ? null : value;

const UserInputPage = () => {
  const [level, setLevel] = useState<Level>(1);
  const router = useRouter();
  const { mutate } = useUserInputSubmit();

  const { register, getValues } = useForm<FormValues>({
    defaultValues: {
      age: null,
      annualIncome: null,
      gender: "",
      employmentStatus: "",
      residenceType: "",
      loanPurpose: "",
      totalDebtAmount: null,
      loanCount: null,
      consent: false,
    },
  });

  const goNext = () => {
    if (level === 1) {
      setLevel(2);
      return;
    }
    if (level === 2) {
      setLevel(3);
      return;
    }

    const values = getValues();
    const payload: UserInputPayload = {
      lv1: {
        age: values.age ?? null,
        annualIncome: values.annualIncome ?? null,
        gender: values.gender === "" ? null : values.gender,
      },
      lv2: {
        employmentStatus: emptyToNull(values.employmentStatus),
        residenceType: emptyToNull(values.residenceType),
      },
      lv3: {
        loanPurpose: emptyToNull(values.loanPurpose),
        totalDebtAmount: values.totalDebtAmount ?? null,
        loanCount: values.loanCount ?? null,
        consent: values.consent,
      },
    };

    mutate(payload, {
      onSettled: () => {
        router.push("/recommend");
      },
    });
  };

  const goBack = () => {
    if (level === 3) {
      setLevel(2);
      return;
    }
    if (level === 2) {
      setLevel(1);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-stone-100 via-stone-100 to-amber-50 px-16 py-14">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-9">
        <AppHeader />

        <section className="grid gap-6 rounded-[32px] border border-stone-200 bg-white/90 p-8 shadow-soft-lg lg:grid-cols-[minmax(200px,0.9fr)_minmax(420px,1.6fr)_minmax(260px,1fr)]">
          <aside className="rounded-3xl border border-stone-200 bg-stone-50 p-5">
            <div className="rounded-2xl border border-stone-200 bg-white px-4 py-2 text-center text-sm font-semibold text-stone-700">
              입력 단계
            </div>
            <ul className="mt-4 grid gap-3 text-sm">
              {([1, 2, 3] as Level[]).map((step) => (
                <li
                  key={step}
                  className="flex items-center justify-between rounded-2xl border border-stone-200 bg-white px-4 py-3"
                >
                  <span className="text-stone-800">{levelMeta[step].title}</span>
                  <span
                    className={`h-2.5 w-2.5 rounded-full ${
                      step === level ? "bg-amber-300" : "bg-stone-300"
                    }`}
                  />
                </li>
              ))}
            </ul>
          </aside>

          <section className="rounded-3xl border border-stone-200 bg-stone-50 p-6">
            <div className="flex flex-wrap gap-3">
              {([1, 2, 3] as Level[]).map((step) => (
                <button
                  key={step}
                  type="button"
                  onClick={() => setLevel(step)}
                  className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                    step === level
                      ? "bg-amber-200 text-stone-900"
                      : "border border-stone-300 bg-white text-stone-600"
                  }`}
                >
                  {levelMeta[step].title}
                </button>
              ))}
            </div>

            <div className="mt-6 rounded-3xl border border-stone-200 bg-white px-6 py-6">
              <h1 className="text-2xl font-semibold text-stone-900">정보 입력</h1>
              <p className="mt-2 text-sm text-stone-600">
                입력하신 정보를 토대로 금융 상품 추천을 진행합니다.
              </p>

              {level === 1 ? (
                <div className="mt-6 grid gap-4">
                  <label className="grid gap-2 text-sm text-stone-700">
                    나이
                    <input
                      type="number"
                      placeholder="나이를 입력하세요"
                      className="rounded-2xl border border-stone-300 px-4 py-2"
                      {...register("age", { valueAsNumber: true })}
                    />
                  </label>
                  <label className="grid gap-2 text-sm text-stone-700">
                    연소득
                    <input
                      type="number"
                      placeholder="연소득을 입력하세요"
                      className="rounded-2xl border border-stone-300 px-4 py-2"
                      {...register("annualIncome", { valueAsNumber: true })}
                    />
                  </label>
                  <div className="grid gap-2 text-sm text-stone-700">
                    성별
                    <div className="flex gap-6">
                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          value="male"
                          {...register("gender")}
                        />
                        남자
                      </label>
                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          value="female"
                          {...register("gender")}
                        />
                        여자
                      </label>
                    </div>
                  </div>
                </div>
              ) : null}

              {level === 2 ? (
                <div className="mt-6 grid gap-4">
                  <label className="grid gap-2 text-sm text-stone-700">
                    고용 형태
                    <select
                      className="rounded-2xl border border-stone-300 px-4 py-2"
                      {...register("employmentStatus")}
                    >
                      <option value="">선택하세요</option>
                      <option value="fulltime">정규직</option>
                      <option value="contract">계약직</option>
                      <option value="self">자영업</option>
                    </select>
                  </label>
                  <label className="grid gap-2 text-sm text-stone-700">
                    거주 형태
                    <select
                      className="rounded-2xl border border-stone-300 px-4 py-2"
                      {...register("residenceType")}
                    >
                      <option value="">선택하세요</option>
                      <option value="own">자가</option>
                      <option value="jeonse">전세</option>
                      <option value="monthly">월세</option>
                    </select>
                  </label>
                </div>
              ) : null}

              {level === 3 ? (
                <div className="mt-6 grid gap-4">
                  <label className="grid gap-2 text-sm text-stone-700">
                    대출 목적
                    <select
                      className="rounded-2xl border border-stone-300 px-4 py-2"
                      {...register("loanPurpose")}
                    >
                      <option value="">선택하세요</option>
                      <option value="living">생활자금</option>
                      <option value="housing">주택자금</option>
                      <option value="business">사업자금</option>
                    </select>
                  </label>
                  <label className="grid gap-2 text-sm text-stone-700">
                    총부채 금액
                    <input
                      type="number"
                      placeholder="총부채 금액을 입력하세요"
                      className="rounded-2xl border border-stone-300 px-4 py-2"
                      {...register("totalDebtAmount", { valueAsNumber: true })}
                    />
                  </label>
                  <label className="grid gap-2 text-sm text-stone-700">
                    기존 대출 수
                    <input
                      type="number"
                      placeholder="기존 대출 수를 입력하세요"
                      className="rounded-2xl border border-stone-300 px-4 py-2"
                      {...register("loanCount", { valueAsNumber: true })}
                    />
                  </label>
                  <label className="flex items-center gap-2 text-sm text-stone-700">
                    <input type="checkbox" {...register("consent")} />
                    금융정보 이용에 동의합니다.
                  </label>
                </div>
              ) : null}
            </div>

            <div className="mt-6 flex items-center justify-between">
              <button
                type="button"
                onClick={goBack}
                disabled={level === 1}
                className={`rounded-full border px-6 py-2 text-sm ${
                  level === 1
                    ? "border-stone-200 text-stone-300"
                    : "border-stone-300 text-stone-600"
                }`}
              >
                뒤로가기
              </button>
              <button
                type="button"
                onClick={goNext}
                className="rounded-full bg-amber-200 px-6 py-2 text-sm font-semibold text-stone-900"
              >
                {level === 3 ? "추천 결과 보기" : "다음으로"}
              </button>
            </div>
          </section>

          <aside className="rounded-3xl border border-stone-200 bg-stone-50 p-5">
            <div className="rounded-2xl border border-stone-200 bg-white px-4 py-2 text-center text-sm font-semibold text-stone-700">
              가이드 & 중요 안내
            </div>
            <div className="mt-4 rounded-2xl border border-stone-200 bg-white px-4 py-4 text-sm text-stone-600">
              입력 항목별 가이드 및 주의사항을 안내합니다.
            </div>
            <div className="mt-4 rounded-2xl border border-stone-200 bg-white px-4 py-4 text-sm text-stone-600">
              입력 레벨이 결과 안내 범위에 미치는 영향이 표시됩니다.
            </div>
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
};

export default UserInputPage;
