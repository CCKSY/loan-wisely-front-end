// LV3 입력 필드
import type { UseFormRegister } from "react-hook-form";

import type { FormValues } from "@/components/user/types";

type LevelThreeFieldsProps = {
  register: UseFormRegister<FormValues>;
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
        <option value="business">사업자금</option>
      </select>
    </label>
    <label className="grid gap-2 text-sm text-stone-700">
      총 부채
      <input
        type="number"
        placeholder="총 부채 금액을 입력하세요"
        className="rounded-2xl border border-stone-300 px-4 py-2"
        {...register("totalDebt", { valueAsNumber: true })}
      />
    </label>
    <label className="grid gap-2 text-sm text-stone-700">
      기존 대출 건수
      <input
        type="number"
        placeholder="기존 대출 건수를 입력하세요"
        className="rounded-2xl border border-stone-300 px-4 py-2"
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
