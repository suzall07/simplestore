import { Skeleton } from "./ui/skeleton";

const ProductItemSkeleton = () => {
  return (
    <div className="group">
      <Skeleton className="aspect-[4/5] w-full" />
      <div className="mt-5 space-y-2">
        <Skeleton className="h-3 w-20" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-5 w-16" />
      </div>
    </div>
  );
};

export default ProductItemSkeleton;
