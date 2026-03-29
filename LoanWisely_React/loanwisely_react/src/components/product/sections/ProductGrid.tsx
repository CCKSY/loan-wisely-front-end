// 상품 리스트 그리드
import ProductCard from "@/components/product/parts/ProductCard";
import type { LoanProduct } from "@/types/product";

type ProductGridProps = {
  products: LoanProduct[];
  onSelect?: (product: LoanProduct) => void;
  selectedId?: number | null;
};

const ProductGrid = ({ products, onSelect, selectedId }: ProductGridProps) => (
  <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
    {products.map((product) => (
      <ProductCard
        key={`product-${product.productId}`}
        product={product}
        onSelect={onSelect}
        isActive={selectedId === product.productId}
      />
    ))}
  </div>
);

export default ProductGrid;
