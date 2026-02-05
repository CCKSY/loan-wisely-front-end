// 입력 단계 사이드바
import type { Level } from "@/components/user/constants";
import { levelMeta } from "@/components/user/constants";

type StepSidebarProps = {
  level: Level;
};

const StepSidebar = ({ level }: StepSidebarProps) => (
  <aside className="rounded-3xl border border-stone-200 bg-stone-50 p-4 sm:p-5">
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
);

export default StepSidebar;
