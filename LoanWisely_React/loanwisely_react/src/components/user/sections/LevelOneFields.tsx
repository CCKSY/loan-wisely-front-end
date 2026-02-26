import type { FormEvent, KeyboardEvent } from "react";
import type { UseFormRegister } from "react-hook-form";

import type { FormValues } from "@/components/user/types";

type LevelOneFieldsProps = {
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

const LevelOneFields = ({ register }: LevelOneFieldsProps) => (
  <div className="mt-5 grid gap-4">
    <label className="grid gap-2 text-sm text-stone-700">
      나이
      <input
        type="number"
        placeholder="나이를 입력하세요 (숫자만 입력 가능합니다)"
        className="rounded-2xl border border-stone-300 px-4 py-2"
        min={0}
        step={1}
        onKeyDown={handleNumberKeyDown}
        onInput={handleNumberInput}
        {...register("age", { valueAsNumber: true })}
      />
    </label>
    <label className="grid gap-2 text-sm text-stone-700">
      연소득 (만원)
      <input
        type="number"
        placeholder="연소득을 만원 단위로 입력하세요 (숫자만 입력 가능합니다)"
        className="rounded-2xl border border-stone-300 px-4 py-2"
        min={0}
        step={1}
        onKeyDown={handleNumberKeyDown}
        onInput={handleNumberInput}
        {...register("annualIncome", { valueAsNumber: true })}
      />
    </label>
    <div className="grid gap-2 text-sm text-stone-700">
      성별
      <div className="flex gap-6">
        <label className="flex items-center gap-2">
          <input type="radio" value="male" {...register("gender")} />
          남자
        </label>
        <label className="flex items-center gap-2">
          <input type="radio" value="female" {...register("gender")} />
          여자
        </label>
      </div>
    </div>
  </div>
);

export default LevelOneFields;
