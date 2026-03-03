import { Skeleton } from "./ui/skeleton";
import ProductItemSkeleton from "./ProductItemSkeleton";

const HomeSkeleton = () => {
  return (
    <div className="overflow-x-hidden bg-white">
      <section className="max-w-[800px] mx-auto px-8 pt-32 pb-20 text-center">
        <Skeleton className="h-16 w-96 mx-auto mb-4" />
        <Skeleton className="h-16 w-80 mx-auto mb-8" />
        <Skeleton className="h-6 w-64 mx-auto mb-12" />
        <Skeleton className="h-12 w-32 mx-auto" />
      </section>

      <section className="max-w-[1280px] mx-auto px-8 py-20 border-t border-border-custom">
        <div className="flex justify-between items-center mb-8">
          <Skeleton className="h-8 w-32" />
          <Skeleton className="h-6 w-24" />
        </div>
        <div className="flex flex-wrap gap-8">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-6 w-24" />
          ))}
        </div>
      </section>

      <section className="max-w-[1280px] mx-auto px-8 py-24 border-t border-border-custom">
        <div className="flex justify-between items-center mb-12">
          <Skeleton className="h-8 w-32" />
          <Skeleton className="h-6 w-24" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {[...Array(3)].map((_, i) => (
            <ProductItemSkeleton key={i} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomeSkeleton;