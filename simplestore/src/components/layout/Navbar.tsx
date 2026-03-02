import { useState, useEffect } from "react";
import { Link, NavLink, useNavigate, useSearchParams, useLocation } from "react-router-dom";
import { useDebounce } from "../../hooks/useDebounce";
import { useCartStore } from "../../store/cartStore";
import { useAuthStore } from "../../store/authStore";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const totalItems = useCartStore((state) => state.totalItems());
  const { token, logout } = useAuthStore();
  
  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "");
  const debouncedSearch = useDebounce(searchQuery, 300);

  useEffect(() => {
    const q = searchParams.get("q");
    if (q !== searchQuery && location.pathname === "/products") {
       if (!q) setSearchQuery("");
    }
  }, [searchParams, location.pathname, searchQuery]);

  useEffect(() => {
    if (debouncedSearch) {
      const params = new URLSearchParams(searchParams);
      params.set("q", debouncedSearch);
      
      if (location.pathname !== "/products") {
        navigate(`/products?${params.toString()}`);
      } else {
        navigate({ search: params.toString() }, { replace: true });
      }
    } else if (debouncedSearch === "" && searchQuery === "" && location.pathname === "/products") {
      const params = new URLSearchParams(searchParams);
      params.delete("q");
      navigate({ search: params.toString() }, { replace: true });
    }
  }, [debouncedSearch, location.pathname, navigate, searchParams, searchQuery]);

  return (
    <nav className="fixed top-0 left-0 right-0 h-[var(--navbar-h)] bg-[#2D1E18] border-b border-[#3D2B1F] z-[100] transition-colors duration-300">
      <div className="max-w-[1280px] mx-auto h-full px-8 flex items-center gap-8">
        <Link to="/" className="logo shrink-0 !text-[#FDFCFB] hover:opacity-80 transition-opacity">
          Simple<span className="text-[#C0A080]">Store</span>
        </Link>
        
        <div className="hidden sm:flex relative flex-1 max-w-[300px]">
          <input 
            type="text" 
            placeholder="Search essentials..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-1.5 bg-[#3D2B1F] border border-[#4D3B2F] rounded-custom text-xs font-light text-[#FDFCFB] placeholder-[#8D7B6F] focus:outline-none focus:border-[#C0A080] transition-colors"
          />
          <span className="absolute right-3 top-2 opacity-50 text-[10px]">🔍</span>
        </div>

        <ul className="hidden md:flex">
          <li>
            <NavLink 
              to="/" 
              end 
              className={({ isActive }) => 
                `px-3 py-1.5 text-sm rounded-custom transition-colors ${
                  isActive ? 'text-[#C0A080] font-medium' : 'text-[#8D7B6F] hover:text-[#FDFCFB]'
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
                  isActive ? 'text-[#C0A080] font-medium' : 'text-[#8D7B6F] hover:text-[#FDFCFB]'
                }`
              }
            >
              Shop
            </NavLink>
          </li>
        </ul>

        <div className="flex items-center gap-2 ml-auto">
          <Link to="/cart" className="hidden sm:flex items-center gap-2 px-4 py-2 border border-[#4D3B2F] rounded-custom text-sm text-[#FDFCFB] hover:border-[#C0A080] transition-colors">
            <span className="text-base">🛒</span>
            <span className="bg-[#C0A080] text-[#2D1E18] text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">{totalItems}</span>
          </Link>
          
          {token ? (
            <div className="flex items-center gap-2">
              <span className="text-sm text-[#FDFCFB] hidden md:inline">Hi, User</span>
              <button 
                onClick={logout}
                className="px-5 py-2 rounded-custom bg-transparent border border-[#4D3B2F] text-[#FDFCFB] text-sm font-medium hover:bg-[#3D2B1F] transition-colors"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link to="/login" className="px-5 py-2 rounded-custom bg-[#C0A080] text-[#2D1E18] text-sm font-medium hover:bg-[#D0B090] transition-colors">
              Login
            </Link>
          )}
          
          <button 
            className="flex md:hidden flex-col gap-1 p-1.5" 
            onClick={() => setOpen(!open)}
          >
            <span className="block w-5 h-[1.5px] bg-[#FDFCFB]" />
            <span className="block w-5 h-[1.5px] bg-[#FDFCFB]" />
            <span className="block w-5 h-[1.5px] bg-[#FDFCFB]" />
          </button>
        </div>
      </div>

      {open && (
        <div className="fixed top-[var(--navbar-h)] left-0 right-0 bottom-0 bg-[#2D1E18] border-b border-[#3D2B1F] px-8 py-8 flex flex-col md:hidden z-50 overflow-y-auto">
          <div className="relative mb-8">
            <input 
              type="text" 
              placeholder="Search essentials..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 bg-[#3D2B1F] border border-[#4D3B2F] rounded-custom text-sm font-light text-[#FDFCFB] placeholder-[#8D7B6F] focus:outline-none focus:border-[#C0A080] transition-colors"
            />
            <span className="absolute right-4 top-3.5 opacity-30 text-xs">🔍</span>
          </div>

          <div className="flex flex-col">
            <NavLink to="/" end onClick={() => setOpen(false)} className="text-lg py-4 border-b border-[#3D2B1F] text-[#8D7B6F] hover:text-[#FDFCFB]">
              Home
            </NavLink>
            <NavLink to="/products" onClick={() => setOpen(false)} className="text-lg py-4 border-b border-[#3D2B1F] text-[#8D7B6F] hover:text-[#FDFCFB]">
              Shop
            </NavLink>
            <NavLink to="/cart" onClick={() => setOpen(false)} className="text-lg py-4 border-b border-[#3D2B1F] text-[#8D7B6F] hover:text-[#FDFCFB]">
              Cart
            </NavLink>
            
            {token ? (
              <button 
                onClick={() => {
                  logout();
                  setOpen(false);
                }}
                className="text-lg py-4 text-left text-[#8D7B6F] hover:text-[#FDFCFB]"
              >
                Logout
              </button>
            ) : (
              <NavLink to="/login" onClick={() => setOpen(false)} className="text-lg py-4 text-[#8D7B6F] hover:text-[#FDFCFB]">
                Login
              </NavLink>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;