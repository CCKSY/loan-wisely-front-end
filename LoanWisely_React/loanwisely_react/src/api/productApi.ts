// 상품 관련 API 호출 함수들을 모아둔 파일
import { fetcher } from "@/infra/fetcher";

import type { ApiResponse } from "@/types/common";
import type { LoanProduct } from "@/types/product";

export const fetchProductList = async (): Promise<LoanProduct[]> =>
  fetcher<ApiResponse<LoanProduct[] | { data?: LoanProduct[] }>>("/api/products", {
    method: "GET",
  }).then((data) => {
    if (Array.isArray(data.data)) {
      return data.data;
    }
    if (data.data && Array.isArray((data.data as { data?: LoanProduct[] }).data)) {
      return (data.data as { data?: LoanProduct[] }).data ?? [];
    }
    return [];
  });
