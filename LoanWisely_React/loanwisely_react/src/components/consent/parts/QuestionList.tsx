// FAQ 질문 목록
import type { FaqItem } from "@/components/consent/data";

type QuestionListProps = {
  items: FaqItem[];
  activeId?: string;
  onSelect: (id: string) => void;
};

const QuestionList = ({ items, activeId, onSelect }: QuestionListProps) => (
  <div className="flex h-full flex-col rounded-3xl border border-stone-200 bg-white px-6 py-5">
    <div className="text-sm font-semibold text-stone-700">서브 카테고리별 FAQ 리스트</div>
    <ul className="mt-4 grid flex-1 content-start gap-2 text-sm">
      {items.map((item) => (
        <li key={item.id}>
          <button
            type="button"
            onClick={() => onSelect(item.id)}
            className={`flex w-full items-center justify-between rounded-2xl border px-4 py-3 text-left ${
              item.id === activeId
                ? "border-amber-300 bg-amber-50 text-stone-900"
                : "border-stone-200 bg-white text-stone-600"
            }`}
          >
            <span>{item.question}</span>
            <span className="text-xs">›</span>
          </button>
        </li>
      ))}
    </ul>
  </div>
);

export default QuestionList;
