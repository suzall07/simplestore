import { Skeleton } from "./ui/skeleton";

const ProductDetailSkeleton = () => {
  return (
    <div className="max-w-[1280px] mx-auto px-8 py-16 lg:py-24">
      <div className="lg:grid lg:grid-cols-2 lg:gap-24 items-start">
        <Skeleton className="bg-bg-soft h-[700px] mb-12 lg:mb-0" />
        
        <div className="max-w-[500px] mt-8 lg:mt-0">
          <div className="flex gap-2 mb-8">
            <Skeleton className="h-4 w-12" />
            <Skeleton className="h-4 w-12" />
            <Skeleton className="h-4 w-12" />
          </div>
          
          <Skeleton className="h-12 w-full mb-6" />
          <Skeleton className="h-8 w-32 mb-8" />
          
          <div className="flex gap-4 mb-10 pb-10 border-b border-border-custom">
            <Skeleton className="h-6 w-16" />
            <Skeleton className="h-6 w-32" />
          </div>
          
          <div className="mb-12">
            <Skeleton className="h-4 w-24 mb-4" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-3/4" />
          </div>
          
          <div className="flex gap-4">
            <Skeleton className="h-12 flex-1" />
            <Skeleton className="h-12 flex-1" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailSkeleton;