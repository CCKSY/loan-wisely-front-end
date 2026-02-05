"use client";
// User input wizard UI.

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

import AppHeader from "@/components/common/AppHeader";
import LoadingOverlay from "@/components/common/LoadingOverlay";
import ActionBar from "@/components/user/sections/ActionBar";
import FormCard from "@/components/user/sections/FormCard";
import GuideSidebar from "@/components/user/sections/GuideSidebar";
import LevelOneFields from "@/components/user/sections/LevelOneFields";
import LevelTabs from "@/components/user/sections/LevelTabs";
import LevelThreeFields from "@/components/user/sections/LevelThreeFields";
import LevelTwoFields from "@/components/user/sections/LevelTwoFields";
import StepSidebar from "@/components/user/sections/StepSidebar";
import UserFooter from "@/components/user/sections/UserFooter";
import { type Level } from "@/components/user/constants";
import type { FormValues } from "@/components/user/types";

import { useRecommendFlow } from "@/hooks/useRecommendFlow";
import type { UserInputPayload } from "@/types/user";

const emptyToNull = (value: string): string | null =>
  value.trim() === "" ? null : value;

const UserInputPage = () => {
  const [level, setLevel] = useState<Level>(1);
  const router = useRouter();
  const recommendFlow = useRecommendFlow();

  const { register, getValues } = useForm<FormValues>({
    defaultValues: {
      age: null,
      incomeYear: null,
      gender: "",
      employmentType: "",
      residenceType: "",
      loanPurpose: "",
      totalDebt: null,
      existingLoanCount: null,
      consent: false,
    },
  });

  const goNext = async () => {
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
        incomeYear: values.incomeYear ?? null,
        gender: values.gender === "" ? null : values.gender,
      },
      lv2: {
        employmentType: emptyToNull(values.employmentType),
        residenceType: emptyToNull(values.residenceType),
      },
      lv3: {
        loanPurpose: emptyToNull(values.loanPurpose),
        totalDebt: values.totalDebt ?? null,
        existingLoanCount: values.existingLoanCount ?? null,
        consent: values.consent,
      },
    };

    try {
      const recommendResponse = await recommendFlow.mutateAsync(payload);
      router.push(`/recommend?id=${recommendResponse.recommendationId}`);
    } catch {
      router.push("/recommend");
    }
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
    <main className="min-h-screen bg-gradient-to-br from-stone-100 via-stone-100 to-amber-50 px-4 py-8 sm:px-8 sm:py-10 lg:px-16 lg:py-14">
      <LoadingOverlay
        visible={recommendFlow.isPending}
        title="추천 결과 생성 중"
        message="조건 확인 → 상품 매칭 → 상환 계산"
      />
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 sm:gap-8">
        <AppHeader />

        <section className="grid gap-6 rounded-[28px] border border-stone-200 bg-white/90 p-5 shadow-soft-lg md:p-6 lg:grid-cols-[minmax(200px,0.9fr)_minmax(420px,1.6fr)_minmax(260px,1fr)] lg:rounded-[32px] lg:p-8">
          <StepSidebar level={level} />

          <section className="rounded-3xl border border-stone-200 bg-stone-50 p-4 sm:p-6">
            <LevelTabs level={level} onChange={setLevel} />

            <FormCard level={level}>
              {level === 1 ? <LevelOneFields register={register} /> : null}
              {level === 2 ? <LevelTwoFields register={register} /> : null}
              {level === 3 ? <LevelThreeFields register={register} /> : null}
            </FormCard>

            <ActionBar
              level={level}
              isPending={recommendFlow.isPending}
              onBack={goBack}
              onNext={goNext}
            />
          </section>

          <GuideSidebar />
        </section>

        <UserFooter />
      </div>
    </main>
  );
};

export default UserInputPage;
