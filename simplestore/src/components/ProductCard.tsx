import { memo } from "react";
import { Link } from "react-router-dom";
import type { Product } from "../types";

const ProductCard = memo(({ product }: { product: Product }) => {
  return (
    <Link to={`/products/${product.id}`} className="group">
      <div className="aspect-[4/5] bg-bg-soft flex items-center justify-center p-10 transition-colors group-hover:bg-[#f0f0ed]">
        <img 
          src={product.image} 
          alt={product.title} 
          loading="lazy"
          className="max-h-full max-w-full object-contain mix-blend-multiply opacity-90 group-hover:opacity-100 transition-opacity" 
        />
      </div>
      <div className="mt-5">
        <div className="text-[10px] uppercase tracking-widest text-text-muted mb-1.5">{product.category}</div>
        <h3 className="text-sm font-medium text-[#111111] group-hover:underline decoration-1 underline-offset-4 mb-2">{product.title}</h3>
        <div className="font-display text-base">${product.price}</div>
      </div>
    </Link>
  );
});

export default ProductCard;