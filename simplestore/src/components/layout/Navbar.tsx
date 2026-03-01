import { useState } from "react";
import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <Link to="/" className="logo">
          Simple<span className="logo-dot">Store</span>
        </Link>

        <ul className="nav-links">
          <li><NavLink to="/" end className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Home</NavLink></li>
          <li><NavLink to="/products" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Shop</NavLink></li>
        </ul>

        <div className="nav-actions">
          <button className="icon-btn" aria-label="Cart">
            🛒
            <span className="cart-badge">0</span>
          </button>
          <Link to="/login" className="btn btn-primary">Login</Link>
          <button className="hamburger" onClick={() => setOpen(!open)} aria-label="Menu">
            <span /><span /><span />
          </button>
        </div>
      </div>

      {open && (
        <div className="mobile-menu">
          <NavLink to="/" end onClick={() => setOpen(false)}>Home</NavLink>
          <NavLink to="/products" onClick={() => setOpen(false)}>Shop</NavLink>
          <NavLink to="/login" onClick={() => setOpen(false)}>Login</NavLink>
        </div>
      )}
    </nav>
  );
};

export default Navbar;