import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchCategories, fetchTrendingProducts } from "../api";
import LoadingSpinner from "../components/ui/LoadingSpinner";

type Category = { id: string; name: string; icon: string; };
type Product = {
  id: number;
  title: string;
  price: number;
  category: string;
  rating: { rate: number; count: number };
  image: string;
};

const Home = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [trending, setTrending] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    Promise.allSettled([fetchCategories(), fetchTrendingProducts()])
      .then(([categoriesResult, trendingResult]) => {
        if (categoriesResult.status === "fulfilled") {
          setCategories(categoriesResult.value);
        } else {
          setError("Failed to load categories.");
        }

        if (trendingResult.status === "fulfilled") {
          setTrending(trendingResult.value);
        } else {
          setError("Failed to load trending products.");
        }
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <LoadingSpinner />;

  if (error) return (
    <div style={{ textAlign: "center", padding: "4rem" }}>
      <p>{error}</p>
      <button onClick={() => window.location.reload()} className="btn btn-primary">
        Retry
      </button>
    </div>
  );

  return (
    <div>
      {/* HERO */}
      <section className="hero">
        <div className="hero-content">
          <div className="hero-tag">
            <span className="hero-tag-dot" />
            New arrivals every week
          </div>
          <h1 className="hero-title">
            Shop Smart.<br />Live <span>Better.</span>
          </h1>
          <p className="hero-desc">
            Discover thousands of products across electronics, fashion, and jewelry.
          </p>
          <div className="hero-cta">
            <Link to="/products" className="btn btn-primary btn-lg">Browse Products</Link>
            <Link to="/products?category=electronics" className="btn btn-outline btn-lg">What's New</Link>
          </div>
          <div className="hero-stats">
            <div>
              <div className="stat-num">20+</div>
              <div className="stat-label">Products</div>
            </div>
            <div>
              <div className="stat-num">4</div>
              <div className="stat-label">Categories</div>
            </div>
            <div>
              <div className="stat-num">4.5</div>
              <div className="stat-label">Avg Rating</div>
            </div>
          </div>
        </div>

        <div className="hero-visual" aria-hidden="true">
          <div className="hero-img-grid">
            <div className="hero-img-card" style={{ background: "#e8f4fd" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%", fontSize: "6rem" }}>
                {categories.find(c => c.id === "electronics")?.icon}
              </div>
              <div className="hero-badge">Electronics</div>
            </div>
            <div className="hero-img-card" style={{ background: "#fde8f0" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%", fontSize: "4rem" }}>
                {categories.find(c => c.id === "women's clothing")?.icon}
              </div>
              <div className="hero-badge hero-badge-accent">New!</div>
            </div>
            <div className="hero-img-card" style={{ background: "#fdf4e8" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%", fontSize: "4rem" }}>
                {categories.find(c => c.id === "jewelery")?.icon}
              </div>
              <div className="hero-badge">Jewelry</div>
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="categories-section">
        <div className="section-header">
          <h2 className="section-title">Shop by Category</h2>
          <Link to="/products" className="section-link">View all</Link>
        </div>
        <div className="categories-grid">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              to={`/products?category=${encodeURIComponent(cat.id)}`}
              className="cat-card"
            >
              <span className="cat-emoji">{cat.icon}</span>
              <div className="cat-name">{cat.name}</div>
            </Link>
          ))}
        </div>
      </section>

      {/* FEATURES */}
      <div className="features-strip">
        <div className="features-inner">
          {[
            { icon: "shipping", title: "Free Shipping", desc: "On orders over $50" },
            { icon: "secure", title: "Secure Payment", desc: "100% protected checkout" },
            { icon: "returns", title: "Easy Returns", desc: "30-day return policy" },
            { icon: "support", title: "24/7 Support", desc: "Always here to help" },
          ].map((f) => (
            <div key={f.title} className="feature-item">
              <div>
                <div className="feature-title">{f.title}</div>
                <div className="feature-desc">{f.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* TRENDING */}
      <section className="trending-section">
        <div className="section-header">
          <h2 className="section-title">Trending Now</h2>
          <Link to="/products" className="section-link">See all</Link>
        </div>
        <div className="trending-grid">
          {trending.map((product) => (
            <Link to={`/products/${product.id}`} key={product.id} className="trending-card">
              <div className="trending-img">
                <img src={product.image} alt={product.title} loading="lazy" />
              </div>
              <div className="trending-body">
                <div className="trending-category">{product.category}</div>
                <div className="trending-name">{product.title}</div>
                <div className="trending-footer">
                  <span className="trending-price">${product.price}</span>
                  <span className="trending-rating">{product.rating.rate} ({product.rating.count} reviews)</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* BANNER */}
      <section className="banner-section">
        <div className="banner">
          <div className="banner-text">
            <div className="banner-eyebrow">Limited Time Offer</div>
            <div className="banner-title">Up to 40% off<br />on Electronics</div>
            <div className="banner-sub">Shop now before the deals run out.</div>
          </div>
          <div className="banner-action">
            <Link to="/products?category=electronics" className="btn btn-primary btn-lg">
              Shop Electronics
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;