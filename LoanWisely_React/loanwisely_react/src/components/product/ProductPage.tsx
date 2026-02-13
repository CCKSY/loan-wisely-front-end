"use client";

import { useMemo, useState } from "react";

import AppHeader from "@/components/common/AppHeader";
import ProductFilterBar from "@/components/product/sections/ProductFilterBar";
import ProductGrid from "@/components/product/sections/ProductGrid";
import ProductSummarySidebar from "@/components/product/sections/ProductSummarySidebar";
import ProductFooter from "@/components/product/sections/ProductFooter";
import { useProductList } from "@/hooks/useProductList";
import type { LoanProduct } from "@/types/product";

const PAGE_SIZE = 9;

// 전체 상품 조회 화면 UI 구성 컴포넌트
const ProductPage = () => {
  const [page, setPage] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState<LoanProduct | null>(
    null,
  );
  const { data: products = [], isLoading } = useProductList();

  const totalPages = Math.max(1, Math.ceil(products.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);

  const pagedProducts = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return products.slice(start, start + PAGE_SIZE);
  }, [currentPage, products]);

  const pageNumbers = useMemo(() => {
    const maxButtons = 7;
    if (totalPages <= maxButtons) {
      return Array.from({ length: totalPages }, (_, index) => index + 1);
    }
    const start = Math.max(1, currentPage - 3);
    const end = Math.min(totalPages, start + maxButtons - 1);
    return Array.from({ length: end - start + 1 }, (_, index) => start + index);
  }, [currentPage, totalPages]);

  return (
    <main className="min-h-screen bg-gradient-to-br from-stone-100 via-stone-100 to-amber-50 px-16 py-14">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-9">
        <AppHeader />

        <section className="grid gap-6 rounded-[32px] border border-stone-200 bg-white/90 p-8 shadow-soft-lg lg:grid-cols-[minmax(0,1fr)_minmax(260px,340px)]">
          <div className="flex flex-col gap-6">
            <div>
              <h1 className="text-3xl font-semibold text-stone-900">
                전체 금융 상품 조회
              </h1>
              <p className="mt-2 text-sm text-stone-600">
                외부 API로 동기화된 모든 상품을 페이지 단위로 확인할 수 있습니다.
              </p>
            </div>

            <ProductFilterBar />
            {isLoading ? (
              <div className="rounded-2xl border border-stone-200 bg-white px-6 py-10 text-center text-sm text-stone-500">
                상품 정보를 불러오는 중입니다.
              </div>
            ) : pagedProducts.length > 0 ? (
              <ProductGrid
                products={pagedProducts}
                onSelect={setSelectedProduct}
                selectedId={selectedProduct?.productId ?? null}
              />
            ) : (
              <div className="rounded-2xl border border-stone-200 bg-white px-6 py-10 text-center text-sm text-stone-500">
                표시할 상품이 없습니다.
              </div>
            )}

            <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-stone-200 bg-white px-5 py-4">
              <div className="text-xs text-stone-500">
                총 {products.length}개 상품 · {currentPage} / {totalPages} 페이지
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => setPage((prev) => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                  className="rounded-full border border-stone-200 px-3 py-1.5 text-xs text-stone-600 disabled:opacity-40"
                >
                  이전
                </button>
                {pageNumbers.map((number) => (
                  <button
                    key={`page-${number}`}
                    type="button"
                    onClick={() => setPage(number)}
                    className={
                      number === currentPage
                        ? "rounded-full bg-stone-900 px-3 py-1.5 text-xs text-white"
                        : "rounded-full border border-stone-200 px-3 py-1.5 text-xs text-stone-600"
                    }
                  >
                    {number}
                  </button>
                ))}
                <button
                  type="button"
                  onClick={() =>
                    setPage((prev) => Math.min(totalPages, prev + 1))
                  }
                  disabled={currentPage === totalPages}
                  className="rounded-full border border-stone-200 px-3 py-1.5 text-xs text-stone-600 disabled:opacity-40"
                >
                  다음
                </button>
              </div>
            </div>
          </div>

          <div className="mt-24">
            <ProductSummarySidebar product={selectedProduct} />
          </div>
        </section>

        <ProductFooter />
      </div>
    </main>
  );
};

export default ProductPage;
