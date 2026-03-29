// FAQ 상세 답변 패널
type AnswerPanelProps = {
  answer?: string;
};

const AnswerPanel = ({ answer }: AnswerPanelProps) => (
  <aside className="flex h-full flex-col rounded-3xl border border-stone-200 bg-white px-6 py-5">
    <div className="text-sm font-semibold text-stone-700">상세 답변</div>
    <div className="mt-5 flex-1 rounded-2xl border border-stone-200 bg-stone-50 px-4 py-6 text-sm text-stone-600">
      {answer ?? "질문을 선택하면 상세 답변이 표시됩니다."}
    </div>
  </aside>
);

export default AnswerPanel;
