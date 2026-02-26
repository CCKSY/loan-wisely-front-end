// FAQ 화면 데모 데이터
export type FaqItem = {
  id: string;
  question: string;
  answer: string;
};

export type FaqSubCategory = {
  id: string;
  name: string;
  items: FaqItem[];
};

export type FaqCategory = {
  id: string;
  name: string;
  subs: FaqSubCategory[];
};

export const faqData: FaqCategory[] = [
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
