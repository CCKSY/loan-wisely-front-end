"use client";

import { useMemo, useState } from "react";

import AppHeader from "@/shared/ui/AppHeader";

type FaqItem = {
  id: string;
  question: string;
  answer: string;
};

type FaqSubCategory = {
  id: string;
  name: string;
  items: FaqItem[];
};

type FaqCategory = {
  id: string;
  name: string;
  subs: FaqSubCategory[];
};

const faqData: FaqCategory[] = [
  {
    id: "cost",
    name: "금리 / 비용 관련",
    subs: [
      {
        id: "cost-1",
        name: "서브 카테고리 1",
        items: [
          {
            id: "q-1",
            question: "금리와 수수료는 어떻게 확인하나요?",
            answer: "상품 상세 보기에서 금리와 수수료 정보를 확인할 수 있습니다.",
          },
          {
            id: "q-2",
            question: "금리 조건은 어떻게 달라지나요?",
            answer: "입력 조건과 금융기관 심사에 따라 금리 조건이 달라질 수 있습니다.",
          },
        ],
      },
      {
        id: "cost-2",
        name: "서브 카테고리 2",
        items: [
          {
            id: "q-3",
            question: "최대 한도는 어떻게 산정되나요?",
            answer: "신용도, 소득, 부채 비율 등으로 산정됩니다.",
          },
        ],
      },
    ],
  },
  {
    id: "loan",
    name: "자격 / 상환 관련",
    subs: [
      {
        id: "loan-1",
        name: "서브 카테고리 1",
        items: [
          {
            id: "q-4",
            question: "상환 방식은 어떤 종류가 있나요?",
            answer: "원리금균등, 원금균등, 만기일시 상환 등이 있습니다.",
          },
        ],
      },
    ],
  },
  {
    id: "audit",
    name: "심사 / 승인 관련",
    subs: [
      {
        id: "audit-1",
        name: "서브 카테고리 1",
        items: [
          {
            id: "q-5",
            question: "심사 기간은 얼마나 걸리나요?",
            answer: "금융기관에 따라 다르며 영업일 기준 1~5일이 일반적입니다.",
          },
        ],
      },
    ],
  },
  {
    id: "risk",
    name: "연체 / 리스크 관련",
    subs: [
      {
        id: "risk-1",
        name: "서브 카테고리 1",
        items: [
          {
            id: "q-6",
            question: "연체 시 불이익이 있나요?",
            answer: "연체 이자와 신용점수 하락 등의 불이익이 발생할 수 있습니다.",
          },
        ],
      },
    ],
  },
];

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
    return (
      category.subs.find((item) => item.id === subId) ?? category.subs[0]
    );
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
    return (
      subCategory.items.find((item) => item.id === questionId) ??
      subCategory.items[0]
    );
  }, [questionId, subCategory]);

  return (
    <main className="min-h-screen bg-gradient-to-br from-stone-100 via-stone-100 to-amber-50 px-16 py-20">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-9">
        <AppHeader />

        <section className="grid gap-6 rounded-[32px] border border-stone-200 bg-white/90 p-8 shadow-soft-lg">
          <div>
            <h1 className="text-3xl font-semibold text-stone-900">FAQ</h1>
            <p className="mt-2 text-sm text-stone-600">
              자주 묻는 질문을 확인하고 필요한 정보를 검색해보세요.
            </p>
          </div>

          <div className="grid min-h-[640px] gap-8 rounded-[28px] border border-stone-200 bg-stone-50 p-12 lg:grid-cols-[minmax(180px,0.7fr)_minmax(0,2.3fr)]">
            <aside className="rounded-3xl border border-stone-200 bg-white px-0 py-6">
              <div className="px-3 text-sm font-semibold text-stone-700">
                전체 카테고리
              </div>
              <ul className="mt-6 grid gap-3 px-3 text-sm">
                {faqData.map((item) => (
                  <li key={item.id}>
                    <button
                      type="button"
                      onClick={() => {
                        setCategoryId(item.id);
                        setSubId("");
                        setQuestionId("");
                      }}
                      className={`flex w-full items-center justify-between rounded-2xl border px-4 py-3 ${
                        item.id === categoryId
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

            <section className="grid gap-1">
              <div className="flex h-12 w-full items-center gap-3 rounded-full border border-stone-200 bg-white px-4 text-sm leading-none text-stone-600">
                <span className="text-xs uppercase tracking-wide text-stone-400">
                  Search
                </span>
                <input
                  value={keyword}
                  onChange={(event) => setKeyword(event.target.value)}
                  placeholder="검색어를 입력하세요"
                  className="flex-1 border-0 bg-transparent text-sm text-stone-700 outline-none"
                />
              </div>

              <div className="grid min-h-[420px] gap-5 lg:grid-cols-3 lg:items-stretch">
                <aside className="flex h-full flex-col rounded-3xl border border-stone-200 bg-white px-5 py-5">
                  <div className="text-sm font-semibold text-stone-700">서브 카테고리</div>
                  <ul className="mt-4 grid flex-1 content-start gap-2 text-sm">
                    {category?.subs.map((item) => (
                      <li key={item.id}>
                        <button
                          type="button"
                          onClick={() => {
                            setSubId(item.id);
                            setQuestionId("");
                          }}
                          className={`flex w-full items-center justify-between rounded-2xl border px-4 py-3 ${
                            item.id === subCategory?.id
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

                <div className="flex h-full flex-col rounded-3xl border border-stone-200 bg-white px-6 py-5">
                  <div className="text-sm font-semibold text-stone-700">
                    서브 카테고리별 FAQ 리스트
                  </div>
                  <ul className="mt-4 grid flex-1 content-start gap-2 text-sm">
                    {filteredItems.map((item) => (
                      <li key={item.id}>
                        <button
                          type="button"
                          onClick={() => setQuestionId(item.id)}
                          className={`flex w-full items-center justify-between rounded-2xl border px-4 py-3 text-left ${
                            item.id === selectedItem?.id
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

                <aside className="flex h-full flex-col rounded-3xl border border-stone-200 bg-white px-6 py-5">
                  <div className="text-sm font-semibold text-stone-700">
                    상세 답변
                  </div>
                  <div className="mt-5 flex-1 rounded-2xl border border-stone-200 bg-stone-50 px-4 py-6 text-sm text-stone-600">
                    {selectedItem?.answer ??
                      "질문을 선택하면 상세 답변이 표시됩니다."}
                  </div>
                </aside>
              </div>
            </section>
          </div>
        </section>

        <footer className="rounded-[28px] border border-stone-200 bg-white/85 px-8 py-5 text-xs text-stone-600 shadow-soft-lg">
          <div className="flex flex-wrap gap-4 pb-2 text-sm font-medium text-stone-700">
            <a href="#" className="hover:text-stone-900">
              이용약관
            </a>
            <a href="#" className="hover:text-stone-900">
              개인정보처리방침
            </a>
            <a href="#" className="hover:text-stone-900">
              고객센터
            </a>
          </div>
          <p>
            본 서비스는 입력된 정보를 기반으로 금융상품을 추천하는 가이드이며,
            추천 결과는 금융기관의 실제 심사 결과와 다를 수 있습니다.
          </p>
        </footer>
      </div>
    </main>
  );
};

export default FaqPage;
