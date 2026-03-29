// 입력 단계 탭
import type { Level } from "@/components/user/constants";
import { levelMeta } from "@/components/user/constants";

type LevelTabsProps = {
  level: Level;
  onChange: (level: Level) => void;
};

const LevelTabs = ({ level, onChange }: LevelTabsProps) => (
  <div className="flex flex-wrap gap-2 sm:gap-3">
    {([1, 2, 3] as Level[]).map((step) => (
      <button
        key={step}
        type="button"
        onClick={() => onChange(step)}
        className={`rounded-full px-3 py-2 text-xs font-semibold transition sm:px-4 sm:text-sm ${
          step === level
            ? "bg-amber-200 text-stone-900"
            : "border border-stone-300 bg-white text-stone-600"
        }`}
      >
        {levelMeta[step].title}
      </button>
    ))}
  </div>
);

export default LevelTabs;
