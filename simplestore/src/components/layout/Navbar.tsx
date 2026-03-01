import { useState, useEffect } from "react";
import { Link, NavLink, useNavigate, useSearchParams, useLocation } from "react-router-dom";
import { useDebounce } from "../../hooks/useDebounce";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  
  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "");
  const debouncedSearch = useDebounce(searchQuery, 300);

  // Sync searchQuery with URL q param changes (e.g. if user navigates away or clears it)
  useEffect(() => {
    const q = searchParams.get("q");
    if (q !== searchQuery && location.pathname === "/products") {
       if (!q) setSearchQuery("");
    }
  }, [searchParams]);

  // Handle URL updates
  useEffect(() => {
    if (debouncedSearch) {
      const params = new URLSearchParams(searchParams);
      params.set("q", debouncedSearch);
      
      // Navigate to products if not there, or just update params if we are
      if (location.pathname !== "/products") {
        navigate(`/products?${params.toString()}`);
      } else {
        navigate({ search: params.toString() }, { replace: true });
      }
    } else if (debouncedSearch === "" && searchQuery === "" && location.pathname === "/products") {
      // Clear search param if query is empty
      const params = new URLSearchParams(searchParams);
      params.delete("q");
      navigate({ search: params.toString() }, { replace: true });
    }
  }, [debouncedSearch]);

  return (
    <nav className="fixed top-0 left-0 right-0 h-[var(--navbar-h)] bg-white/95 backdrop-blur-md border-b border-border-custom z-[100]">
      <div className="max-w-[1280px] mx-auto h-full px-8 flex items-center gap-8">
        <Link to="/" className="logo shrink-0">
          Simple<span className="text-text-muted">Store</span>
        </Link>
        
        {/* Global Search Input */}
        <div className="hidden sm:flex relative flex-1 max-w-[300px]">
          <input 
            type="text" 
            placeholder="Search essentials..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-1.5 bg-bg-soft border border-border-custom rounded-custom text-xs font-light focus:outline-none focus:border-[#111111] transition-colors"
          />
          <span className="absolute right-3 top-2 opacity-30 text-[10px]">🔍</span>
        </div>

        <ul className="hidden md:flex">
          <li>
            <NavLink 
              to="/" 
              end 
              className={({ isActive }) => 
                `px-3 py-1.5 text-sm rounded-custom transition-colors ${
                  isActive ? 'text-[#111111] font-medium' : 'text-text-muted hover:text-[#111111]'
                }`
              }
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/products" 
              className={({ isActive }) => 
                `px-3 py-1.5 text-sm rounded-custom transition-colors ${
                  isActive ? 'text-[#111111] font-medium' : 'text-text-muted hover:text-[#111111]'
                }`
              }
            >
              Shop
            </NavLink>
          </li>
        </ul>

        <div className="flex items-center gap-2 ml-auto">
          <Link to="/cart" className="hidden sm:flex items-center gap-2 px-4 py-2 border border-border-custom rounded-custom text-sm hover:border-[#111111]">
            🛒
            <span className="bg-[#111111] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">0</span>
          </Link>
          <Link to="/login" className="btn btn-primary">Login</Link>
          <button 
            className="flex md:hidden flex-col gap-1 p-1.5" 
            onClick={() => setOpen(!open)}
          >
            <span className="block w-5 h-[1.5px] bg-[#111111]" />
            <span className="block w-5 h-[1.5px] bg-[#111111]" />
            <span className="block w-5 h-[1.5px] bg-[#111111]" />
          </button>
        </div>
      </div>

      {open && (
        <div className="fixed top-[var(--navbar-h)] left-0 right-0 bg-white border-b border-border-custom px-8 py-4 flex flex-col md:hidden">
          <NavLink to="/" end onClick={() => setOpen(false)} className="text-sm py-3 border-b border-border-custom text-text-muted">
            Home
          </NavLink>
          <NavLink to="/products" onClick={() => setOpen(false)} className="text-sm py-3 border-b border-border-custom text-text-muted">
            Shop
          </NavLink>
          <NavLink to="/cart" onClick={() => setOpen(false)} className="text-sm py-3 border-b border-border-custom text-text-muted">
            Cart
          </NavLink>
          <NavLink to="/login" onClick={() => setOpen(false)} className="text-sm py-3 text-text-muted">
            Login
          </NavLink>
        </div>
      )}
    </nav>
  );
};

export default Navbar;