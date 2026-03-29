import { useQuery } from "@tanstack/react-query";

import { fetchProductList } from "@/api/productApi";
import type { LoanProduct } from "@/types/product";

export const useProductList = () =>
  useQuery<LoanProduct[]>({
    queryKey: ["productList"],
    queryFn: fetchProductList,
    staleTime: 1000 * 60 * 5,
  });
