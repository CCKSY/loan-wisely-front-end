type SummarySectionProps = {
  summaryItems: string[];
  levelUsed: string;
  levelStatus: "full" | "partial" | "empty";
};

const levelBadgeClass = (status: "full" | "partial" | "empty") => {
  if (status === "full") return "bg-emerald-200 text-emerald-900";
  if (status === "partial") return "bg-amber-200 text-amber-900";
  return "bg-stone-200 text-stone-700";
};

const SummarySection = ({ summaryItems, levelUsed, levelStatus }: SummarySectionProps) => (
  <div className="rounded-3xl border border-stone-200 bg-stone-50 px-6 py-5">
    <div className="flex items-center gap-3">
      <div className="text-sm font-semibold text-stone-900">분석 요약</div>
      <span
        className={`rounded-full px-3 py-1 text-xs font-semibold ${levelBadgeClass(levelStatus)}`}
      >
        {levelUsed}
      </span>
    </div>
    <ul className="mt-3 grid gap-2 text-sm text-stone-600">
      {summaryItems.map((item) => (
        <li key={item}>- {item}</li>
      ))}
    </ul>
  </div>
);

export default SummarySection;
