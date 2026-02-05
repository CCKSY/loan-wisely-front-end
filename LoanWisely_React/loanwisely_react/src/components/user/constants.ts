// 사용자 입력 단계 및 메타 정보
export type Level = 1 | 2 | 3;

export type LevelMeta = {
  title: string;
  description: string;
};

export const levelMeta: Record<Level, LevelMeta> = {
  1: {
    title: "Lv.1 필수 정보",
    description: "나이, 연소득, 성별을 입력합니다.",
  },
  2: {
    title: "Lv.2 선택 정보",
    description: "고용 형태와 거주 형태를 입력합니다.",
  },
  3: {
    title: "Lv.3 추가 정보",
    description: "대출 목적과 부채 정보를 입력합니다.",
  },
};
