import { Skeleton } from "./ui/skeleton";
import ProductItemSkeleton from "./ProductItemSkeleton";

const ProductsSkeleton = () => {
  return (
    <div className="max-w-[1280px] mx-auto px-8 py-16">
      <div className="mb-16">
        <Skeleton className="h-10 w-48 mb-2" />
        <Skeleton className="h-4 w-64" />
      </div>
      <div className="lg:flex gap-16">
        <aside className="w-full lg:w-48 shrink-0">
          <Skeleton className="h-96 w-full" />
        </aside>
        <div className="flex-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-16">
            {[...Array(6)].map((_, i) => (
              <ProductItemSkeleton key={i} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsSkeleton;