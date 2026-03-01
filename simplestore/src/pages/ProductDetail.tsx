import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchProductById } from "../api";
import LoadingSpinner from "../components/ui/LoadingSpinner";

type Product = {
  id: number;
  title: string;
  price: number;
  category: string;
  description: string;
  image: string;
  rating: { rate: number; count: number };
};

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      fetchProductById(id)
        .then((data: Product) => setProduct(data))
        .catch(() => setError("Failed to load product details."))
        .finally(() => setLoading(false));
    }
  }, [id]);

  if (loading) return <LoadingSpinner />;

  if (error || !product) {
    return (
      <div className="text-center p-20">
        <p className="text-text-muted mb-6">{error || "Product not found."}</p>
        <Link to="/products" className="btn btn-outline">Back to Products</Link>
      </div>
    );
  }

  return (
    <div className="max-w-[1280px] mx-auto px-8 py-16 lg:py-24">
      <div className="lg:grid lg:grid-cols-2 lg:gap-24 items-start">
        {/* Visuals */}
        <div className="bg-bg-soft flex items-center justify-center p-12 lg:p-20 mb-12 lg:mb-0 aspect-square lg:aspect-auto lg:h-[700px]">
          <img 
            src={product.image} 
            alt={product.title} 
            className="max-h-full max-w-full object-contain mix-blend-multiply" 
          />
        </div>

        {/* Info */}
        <div className="max-w-[500px]">
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
            <button className="btn btn-primary btn-lg flex-1 justify-center py-4">
              Add to Cart
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
