// 상품 리스트 그리드
import ProductCard from "@/components/product/parts/ProductCard";

type ProductGridProps = {
  count?: number;
};

const ProductGrid = ({ count = 3 }: ProductGridProps) => (
  <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
    {Array.from({ length: count }).map((_, index) => (
      <ProductCard key={`product-${index}`} />
    ))}
  </div>
);

export default ProductGrid;
