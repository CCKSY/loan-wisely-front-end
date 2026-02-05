// 입력 단계 이동 버튼
type ActionBarProps = {
  level: 1 | 2 | 3;
  isPending: boolean;
  onBack: () => void;
  onNext: () => void;
};

const ActionBar = ({ level, isPending, onBack, onNext }: ActionBarProps) => (
  <div className="mt-5 flex flex-wrap items-center justify-between gap-3 sm:mt-6">
    <button
      type="button"
      onClick={onBack}
      disabled={level === 1 || isPending}
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
      onClick={onNext}
      disabled={isPending}
      className="rounded-full bg-amber-200 px-6 py-2 text-sm font-semibold text-stone-900 disabled:opacity-60"
    >
      {level === 3 ? "추천 결과 보기" : "다음으로"}
    </button>
  </div>
);

export default ActionBar;
