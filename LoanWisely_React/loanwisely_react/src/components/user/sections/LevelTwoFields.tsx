// LV2 입력 필드
import type { UseFormRegister } from "react-hook-form";

import type { FormValues } from "@/components/user/types";

type LevelTwoFieldsProps = {
  register: UseFormRegister<FormValues>;
};

const LevelTwoFields = ({ register }: LevelTwoFieldsProps) => (
  <div className="mt-5 grid gap-4">
    <label className="grid gap-2 text-sm text-stone-700">
      고용 형태
      <select
        className="rounded-2xl border border-stone-300 px-4 py-2"
        {...register("employmentType")}
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
);

export default LevelTwoFields;
