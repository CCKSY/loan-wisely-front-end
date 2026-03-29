// FAQ 서브 카테고리 목록
import type { FaqSubCategory } from "@/components/consent/data";

type SubCategoryListProps = {
  items: FaqSubCategory[];
  activeId?: string;
  onSelect: (id: string) => void;
};

const SubCategoryList = ({ items, activeId, onSelect }: SubCategoryListProps) => (
  <aside className="flex h-full flex-col rounded-3xl border border-stone-200 bg-white px-5 py-5">
    <div className="text-sm font-semibold text-stone-700">서브 카테고리</div>
    <ul className="mt-4 grid flex-1 content-start gap-2 text-sm">
      {items.map((item) => (
        <li key={item.id}>
          <button
            type="button"
            onClick={() => onSelect(item.id)}
            className={`flex w-full items-center justify-between rounded-2xl border px-4 py-3 ${
              item.id === activeId
                ? "border-amber-300 bg-amber-50 text-stone-900"
                : "border-stone-200 bg-white text-stone-600"
            }`}
          >
            <span>{item.name}</span>
            <span className="text-xs">›</span>
          </button>
        </li>
      ))}
    </ul>
  </aside>
);

export default SubCategoryList;
