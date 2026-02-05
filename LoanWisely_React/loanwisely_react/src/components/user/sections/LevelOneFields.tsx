// LV1 입력 필드
import type { UseFormRegister } from "react-hook-form";

import type { FormValues } from "@/components/user/types";

type LevelOneFieldsProps = {
  register: UseFormRegister<FormValues>;
};

const LevelOneFields = ({ register }: LevelOneFieldsProps) => (
  <div className="mt-5 grid gap-4">
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
        {...register("incomeYear", { valueAsNumber: true })}
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
