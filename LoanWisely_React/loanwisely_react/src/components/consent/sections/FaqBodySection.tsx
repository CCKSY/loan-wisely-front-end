// FAQ 본문 섹션
import type { FaqCategory } from "@/components/consent/data";
import AnswerPanel from "@/components/consent/parts/AnswerPanel";
import CategoryList from "@/components/consent/parts/CategoryList";
import QuestionList from "@/components/consent/parts/QuestionList";
import SearchBar from "@/components/consent/parts/SearchBar";
import SubCategoryList from "@/components/consent/parts/SubCategoryList";

type FaqBodySectionProps = {
  categories: FaqCategory[];
  activeCategoryId: string;
  activeSubId?: string;
  activeQuestionId?: string;
  keyword: string;
  onCategoryChange: (id: string) => void;
  onSubChange: (id: string) => void;
  onQuestionChange: (id: string) => void;
  onKeywordChange: (value: string) => void;
  subCategories: FaqCategory["subs"];
  filteredQuestions: FaqCategory["subs"][number]["items"];
  answer?: string;
};

const FaqBodySection = ({
  categories,
  activeCategoryId,
  activeSubId,
  activeQuestionId,
  keyword,
  onCategoryChange,
  onSubChange,
  onQuestionChange,
  onKeywordChange,
  subCategories,
  filteredQuestions,
  answer,
}: FaqBodySectionProps) => (
  <div className="grid min-h-[640px] gap-8 rounded-[28px] border border-stone-200 bg-stone-50 p-12 lg:grid-cols-[minmax(180px,0.7fr)_minmax(0,2.3fr)]">
    <CategoryList
      categories={categories}
      activeId={activeCategoryId}
      onSelect={onCategoryChange}
    />

    <section className="grid gap-1">
      <SearchBar value={keyword} onChange={onKeywordChange} />

      <div className="grid min-h-[420px] gap-5 lg:grid-cols-3 lg:items-stretch">
        <SubCategoryList items={subCategories} activeId={activeSubId} onSelect={onSubChange} />
        <QuestionList items={filteredQuestions} activeId={activeQuestionId} onSelect={onQuestionChange} />
        <AnswerPanel answer={answer} />
      </div>
    </section>
  </div>
);

export default FaqBodySection;
