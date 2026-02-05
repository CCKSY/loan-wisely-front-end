// 전체 상품 조회 화면 UI 구성 컴포넌트
import AppHeader from "@/components/common/AppHeader";
import ProductFilterBar from "@/components/product/sections/ProductFilterBar";
import ProductGrid from "@/components/product/sections/ProductGrid";
import ProductSummarySidebar from "@/components/product/sections/ProductSummarySidebar";
import ProductFooter from "@/components/product/sections/ProductFooter";

const ProductPage = () => (
  <main className="min-h-screen bg-gradient-to-br from-stone-100 via-stone-100 to-amber-50 px-16 py-14">
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-9">
      <AppHeader />

      <section className="grid gap-6 rounded-[32px] border border-stone-200 bg-white/90 p-8 shadow-soft-lg lg:grid-cols-[minmax(0,1fr)_minmax(260px,340px)]">
        <div className="flex flex-col gap-6">
          <div>
            <h1 className="text-3xl font-semibold text-stone-900">전체 금융 상품 조회</h1>
            <p className="mt-2 text-sm text-stone-600">
              전체 상품을 대출사, 대출 종류, 최대 한도 등으로 정렬할 수 있습니다.
            </p>
          </div>

          <ProductFilterBar />
          <ProductGrid />
        </div>

        <ProductSummarySidebar />
      </section>

      <ProductFooter />
    </div>
  </main>
);

export default ProductPage;
