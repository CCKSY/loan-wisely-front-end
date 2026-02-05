"use client";
// FAQ and guide UI.

import { useMemo, useState } from "react";

import AppHeader from "@/components/common/AppHeader";
import { faqData } from "@/components/consent/data";
import FaqBodySection from "@/components/consent/sections/FaqBodySection";
import FaqFooter from "@/components/consent/sections/FaqFooter";
import FaqHeaderSection from "@/components/consent/sections/FaqHeaderSection";

const FaqPage = () => {
  const [categoryId, setCategoryId] = useState(faqData[0]?.id ?? "");
  const [subId, setSubId] = useState("");
  const [questionId, setQuestionId] = useState("");
  const [keyword, setKeyword] = useState("");

  const category = useMemo(
    () => faqData.find((item) => item.id === categoryId) ?? faqData[0],
    [categoryId],
  );

  const subCategory = useMemo(() => {
    if (!category) {
      return undefined;
    }
    return category.subs.find((item) => item.id === subId) ?? category.subs[0];
  }, [category, subId]);

  const filteredItems = useMemo(() => {
    if (!subCategory) {
      return [];
    }
    if (keyword.trim() === "") {
      return subCategory.items;
    }
    const lower = keyword.toLowerCase();
    return subCategory.items.filter((item) =>
      item.question.toLowerCase().includes(lower),
    );
  }, [keyword, subCategory]);

  const selectedItem = useMemo(() => {
    if (!subCategory) {
      return undefined;
    }
    return subCategory.items.find((item) => item.id === questionId) ?? subCategory.items[0];
  }, [questionId, subCategory]);

  return (
    <main className="min-h-screen bg-gradient-to-br from-stone-100 via-stone-100 to-amber-50 px-16 py-20">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-9">
        <AppHeader />

        <section className="grid gap-6 rounded-[32px] border border-stone-200 bg-white/90 p-8 shadow-soft-lg">
          <FaqHeaderSection />
          <FaqBodySection
            categories={faqData}
            activeCategoryId={categoryId}
            activeSubId={subCategory?.id}
            activeQuestionId={selectedItem?.id}
            keyword={keyword}
            onCategoryChange={(id) => {
              setCategoryId(id);
              setSubId("");
              setQuestionId("");
            }}
            onSubChange={(id) => {
              setSubId(id);
              setQuestionId("");
            }}
            onQuestionChange={setQuestionId}
            onKeywordChange={setKeyword}
            subCategories={category?.subs ?? []}
            filteredQuestions={filteredItems}
            answer={selectedItem?.answer}
          />
        </section>

        <FaqFooter />
      </div>
    </main>
  );
};

export default FaqPage;
