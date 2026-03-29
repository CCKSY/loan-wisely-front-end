type RiskSectionProps = {
  riskNotes: string[];
  fallbackNote: string;
};

const RiskSection = ({ riskNotes, fallbackNote }: RiskSectionProps) => (
  <div className="rounded-3xl border border-stone-200 bg-stone-50/70 px-6 py-5">
    <div className="text-sm font-semibold text-stone-900">주요 리스크 안내</div>
    {(riskNotes.length > 0 ? riskNotes : [fallbackNote]).map((note) => (
      <div
        key={note}
        className="mt-3 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-4 text-xs text-amber-900"
      >
        {note}
      </div>
    ))}
  </div>
);

export default RiskSection;
