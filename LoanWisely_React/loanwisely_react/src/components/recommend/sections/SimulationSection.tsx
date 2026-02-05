// 상환 시뮬레이션 섹션
type SimulationSectionProps = {
  monthlyPaymentExample: string;
};

const SimulationSection = ({ monthlyPaymentExample }: SimulationSectionProps) => (
  <div className="rounded-3xl border border-stone-200 bg-white px-6 py-6">
    <div className="text-sm font-semibold text-stone-900">상환 시뮬레이션</div>
    <div className="mt-4 rounded-2xl border border-dashed border-stone-200 bg-stone-50 px-4 py-6 text-sm text-stone-500">
      {monthlyPaymentExample}
    </div>
  </div>
);

export default SimulationSection;
