import type { FormEvent, KeyboardEvent } from "react";
import type { UseFormRegister } from "react-hook-form";

import type { FormValues } from "@/components/user/types";

type LevelThreeFieldsProps = {
  register: UseFormRegister<FormValues>;
};

const BLOCKED_NUMBER_KEYS = new Set(["-", "+", "e", "E", "."]);

const handleNumberKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
  if (BLOCKED_NUMBER_KEYS.has(event.key)) {
    event.preventDefault();
  }
};

const handleNumberInput = (event: FormEvent<HTMLInputElement>) => {
  const sanitized = event.currentTarget.value.replace(/[^0-9]/g, "");
  if (event.currentTarget.value !== sanitized) {
    event.currentTarget.value = sanitized;
  }
};

const LevelThreeFields = ({ register }: LevelThreeFieldsProps) => (
  <div className="mt-5 grid gap-4">
    <label className="grid gap-2 text-sm text-stone-700">
      대출 목적
      <select
        className="rounded-2xl border border-stone-300 px-4 py-2"
        {...register("loanPurpose")}
      >
        <option value="">선택하세요</option>
        <option value="living">생활자금</option>
        <option value="housing">주택자금</option>
        <option value="rent">전세/월세자금</option>
        <option value="business">사업자금</option>
      </select>
    </label>
    <label className="grid gap-2 text-sm text-stone-700">
      총 부채 (만원)
      <input
        type="number"
        placeholder="총 부채 금액을 만원 단위로 입력하세요 (숫자만 입력 가능합니다)"
        className="rounded-2xl border border-stone-300 px-4 py-2"
        min={0}
        step={1}
        onKeyDown={handleNumberKeyDown}
        onInput={handleNumberInput}
        {...register("totalDebtAmount", { valueAsNumber: true })}
      />
    </label>
    <label className="grid gap-2 text-sm text-stone-700">
      기존 대출 건수
      <input
        type="number"
        placeholder="기존 대출 건수를 입력하세요 (숫자만 입력 가능합니다)"
        className="rounded-2xl border border-stone-300 px-4 py-2"
        min={0}
        step={1}
        onKeyDown={handleNumberKeyDown}
        onInput={handleNumberInput}
        {...register("existingLoanCount", { valueAsNumber: true })}
      />
    </label>
    <label className="flex items-center gap-2 text-sm text-stone-700">
      <input type="checkbox" {...register("consent")} />
      금융정보 이용에 동의합니다.
    </label>
  </div>
);

export default LevelThreeFields;
