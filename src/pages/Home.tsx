import { Link } from "react-router-dom";
import { useCategoriesQuery, useTrendingProductsQuery } from "../hooks/useProductsQuery";
import HomeSkeleton from "../components/HomeSkeleton";
import type { Category, Product } from "../types";

const Home = () => {
  const { data: categories = [], isLoading: categoriesLoading, error: categoriesError } = useCategoriesQuery();
  const { data: trending = [], isLoading: trendingLoading, error: trendingError } = useTrendingProductsQuery();

  if (categoriesLoading || trendingLoading) return <HomeSkeleton />;

  if (categoriesError || trendingError) return (
    <div className="text-center p-16">
      <p>Failed to load data.</p>
      <button onClick={() => window.location.reload()} className="btn btn-primary mt-4">
        Retry
      </button>
    </div>
  );

  return (
    <div className="overflow-x-hidden bg-white">
      <section className="max-w-[800px] mx-auto px-8 pt-32 pb-20 text-center">
        <h1 className="font-display text-5xl md:text-7xl leading-tight tracking-tight mb-8 text-[#111111]">
          Essential goods for <br />
          <span className="italic font-light">intentional living.</span>
        </h1>
        <p className="text-text-muted text-lg max-w-[500px] mx-auto mb-12 leading-relaxed font-light">
          E-commerce.
        </p>
        <div className="flex justify-center">
          <Link to="/products" className="btn btn-primary btn-lg">Shop All</Link>
        </div>
      </section>

      <section className="max-w-[1280px] mx-auto px-8 py-20 border-t border-border-custom">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
          <h2 className="font-display text-2xl tracking-tight">Categories</h2>
          <div className="flex flex-wrap gap-x-8 gap-y-4">
            {categories.map((cat: Category) => (
              <Link
                key={cat.id}
                to={`/products?category=${encodeURIComponent(cat.id)}`}
                className="text-sm uppercase tracking-widest text-text-muted hover:text-[#111111] transition-colors"
              >
                {cat.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-[1280px] mx-auto px-8 py-24 border-t border-border-custom">
        <div className="flex items-baseline justify-between mb-12">
          <h2 className="font-display text-2xl tracking-tight">Featured</h2>
          <Link to="/products" className="text-sm text-text-muted hover:text-[#111111] border-b border-transparent hover:border-[#111111] transition-all">
            See all
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {trending.map((product: Product) => (
            <Link to={`/products/${product.id}`} key={product.id} className="group flex flex-col items-center">
              <div className="aspect-[4/5] w-full bg-bg-soft flex items-center justify-center p-12 transition-all group-hover:bg-[#f0f0ed]">
                <img src={product.image} alt={product.title} loading="lazy" className="max-h-full max-w-full object-contain mix-blend-multiply opacity-90 group-hover:opacity-100 transition-opacity" />
              </div>
              <div className="mt-6 text-center w-full max-w-[280px]">
                <div className="text-[10px] uppercase tracking-[0.2em] text-text-muted mb-2">{product.category}</div>
                <h3 className="font-medium text-sm text-[#111111] mb-2 px-4">{product.title}</h3>
                <div className="font-display text-lg">${product.price}</div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;