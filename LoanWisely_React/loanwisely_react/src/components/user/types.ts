// 사용자 입력 폼 값 타입
export type FormValues = {
  age: number | null;
  incomeYear: number | null;
  gender: "male" | "female" | "";
  employmentType: string;
  residenceType: string;
  loanPurpose: string;
  totalDebt: number | null;
  existingLoanCount: number | null;
  consent: boolean;
};
