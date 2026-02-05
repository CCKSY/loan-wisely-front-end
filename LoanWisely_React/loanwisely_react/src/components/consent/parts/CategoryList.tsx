// FAQ 카테고리 목록
import type { FaqCategory } from "@/components/consent/data";

type CategoryListProps = {
  categories: FaqCategory[];
  activeId: string;
  onSelect: (id: string) => void;
};

const CategoryList = ({ categories, activeId, onSelect }: CategoryListProps) => (
  <aside className="rounded-3xl border border-stone-200 bg-white px-0 py-6">
    <div className="px-3 text-sm font-semibold text-stone-700">전체 카테고리</div>
    <ul className="mt-6 grid gap-3 px-3 text-sm">
      {categories.map((item) => (
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

export default CategoryList;
