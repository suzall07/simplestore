import { useAuthStore } from "../store/authStore";
import { useCartStore } from "../store/cartStore";
import { Link } from "react-router-dom";

const Profile = () => {
  const { user, logout } = useAuthStore();
  const { items, totalPrice } = useCartStore();

  return (
    <div className="max-w-[800px] mx-auto px-8 py-16">
      <h1 className="font-display text-3xl mb-2">Profile</h1>
      <p className="text-text-muted text-sm mb-12">Account overview.</p>

      <div className="border-t border-border-custom pt-10">
        <div className="mb-10">
          <div className="text-[10px] uppercase tracking-widest text-text-muted mb-3">Username</div>
          <div className="text-base">{user?.username || user?.email}</div>
        </div>

        <div className="mb-10">
          <div className="text-[10px] uppercase tracking-widest text-text-muted mb-3">Cart</div>
          <div className="text-base">{items.length} items • ${totalPrice().toFixed(2)}</div>
          <Link to="/cart" className="text-xs text-text-muted hover:text-[#111111] mt-2 inline-block underline underline-offset-4">
            View cart
          </Link>
        </div>

        <button 
          onClick={logout}
          className="text-xs uppercase tracking-widest text-red-500 hover:text-red-600 transition-colors mt-6"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;