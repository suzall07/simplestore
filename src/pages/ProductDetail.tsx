import { useParams, Link } from "react-router-dom";
import { useProductQuery } from "../hooks/useProductsQuery";
import { useCartStore } from "../store/cartStore";
import ProductDetailSkeleton from "../components/ProductDetailSkeleton";

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { data: product, isLoading, error } = useProductQuery(id || "");
  const { items, addItem } = useCartStore();
  const isInCart = product ? items.some(item => item.id === product.id) : false;

  const handleAddToCart = () => {
    if (product && !isInCart) {
      addItem(product);
    }
  };

  if (isLoading) return <ProductDetailSkeleton />;

  if (error || !product) {
    return (
      <div className="text-center p-20">
        <p className="text-text-muted mb-6">Product not found.</p>
        <Link to="/products" className="btn btn-outline">Back to Products</Link>
      </div>
    );
  }

  return (
    <div className="max-w-[1280px] mx-auto px-8 py-16 lg:py-24">
      <div className="lg:grid lg:grid-cols-2 lg:gap-24 items-start">
        <div className="bg-bg-soft flex items-center justify-center p-12 lg:p-20 mb-12 lg:mb-0 aspect-square lg:aspect-auto lg:h-[700px]">
          <img 
            src={product.image} 
            alt={product.title} 
            className="max-h-full max-w-full object-contain mix-blend-multiply" 
          />
        </div>

        <div className="max-w-[500px] mt-8 lg:mt-0">
          <nav className="flex gap-2 text-[10px] uppercase tracking-widest text-text-muted mb-8">
            <Link to="/" className="hover:text-[#111111]">Home</Link>
            <span>/</span>
            <Link to="/products" className="hover:text-[#111111]">Products</Link>
            <span>/</span>
            <span className="text-[#111111]">{product.category}</span>
          </nav>

          <h1 className="font-display text-4xl lg:text-5xl leading-tight text-[#111111] mb-6">
            {product.title}
          </h1>

          <div className="text-2xl font-display text-[#111111] mb-8">
            ${product.price}
          </div>

          <div className="flex items-center gap-4 mb-10 pb-10 border-b border-border-custom">
            <div className="text-sm font-medium">
              {product.rating.rate} ★
            </div>
            <div className="text-xs text-text-muted font-light">
              Based on {product.rating.count} reviews
            </div>
          </div>

          <div className="mb-12">
            <h2 className="text-[10px] uppercase tracking-[0.2em] font-medium text-[#111111] mb-4">Description</h2>
            <p className="text-text-muted font-light leading-relaxed">
              {product.description}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <button 
              onClick={handleAddToCart}
              disabled={isInCart}
              className={`btn btn-lg flex-1 justify-center py-4 transition-all ${
                isInCart 
                ? 'bg-green-600 text-white cursor-not-allowed opacity-50' 
                : 'bg-brand-accent text-brand-brown hover:bg-brand-accent-hover'
              }`}
            >
              {isInCart ? '✓ Added to Cart' : 'Add to Cart'}
            </button>
            <Link to="/products" className="btn btn-outline btn-lg flex-1 justify-center py-4">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;