import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="footer">
    <div className="footer-inner">
      <div className="footer-brand">
        <Link to="/" className="logo">Simple<span className="logo-dot">Store</span></Link>
        <p>Discover all the product</p>
      </div>
      <div className="footer-col">
        <h4>Shop</h4>
        <Link to="/products">All Products</Link>
        <Link to="/products?category=electronics">Electronics</Link>
        <Link to="/products?category=jewelery">Jewelry</Link>
        <Link to="/products?category=men's clothing">Men's</Link>
      </div>
      <div className="footer-col">
        <h4>Account</h4>
        <Link to="/login">Login</Link>
        <Link to="/cart">Cart</Link>
        <Link to="/profile">Profile</Link>
      </div>
      <div className="footer-col">
        <h4>Help</h4>
        <Link to="#">FAQ</Link>
        <Link to="#">Returns</Link>
        <Link to="#">Contact</Link>
      </div>
    </div>
  </footer>
);

export default Footer;