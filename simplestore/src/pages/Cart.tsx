import { Link } from "react-router-dom";
import { useCartStore } from "../store/cartStore";

const Cart = () => {
  const { items, removeItem, updateQuantity, totalPrice } = useCartStore();

  return (
    <div className="max-w-[1280px] mx-auto px-8 py-16 lg:py-24">
      <div className="mb-16">
        <h1 className="font-display text-4xl text-[#111111] mb-4">Cart</h1>
        <p className="text-text-muted font-light">Review your selection before checkout.</p>
      </div>

      {items.length === 0 ? (
        <div className="py-20 text-center border-t border-border-custom">
          <div className="text-4xl mb-6">🛒</div>
          <p className="text-text-muted font-light mb-10">Your cart is currently empty.</p>
          <Link to="/products" className="btn btn-primary btn-lg">
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="lg:grid lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-8 flex flex-col gap-8">
            {items.map((item) => (
              <div key={item.id} className="flex gap-6 pb-8 border-b border-bg-soft items-start">
                <div className="w-24 h-24 bg-bg-soft flex items-center justify-center p-4 rounded-custom shrink-0">
                  <img src={item.image} alt={item.title} className="max-h-full max-w-full object-contain mix-blend-multiply" />
                </div>
                <div className="flex-1">
                   <div className="flex justify-between items-start mb-2">
                      <h3 className="text-sm font-medium text-[#111111]">{item.title}</h3>
                      <div className="font-display text-sm">${item.price}</div>
                   </div>
                   <div className="text-[10px] uppercase tracking-widest text-text-muted mb-4">{item.category}</div>
                   
                   <div className="flex items-center justify-between mt-auto">
                      <div className="flex items-center border border-border-custom rounded-custom">
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="px-3 py-1 text-text-muted hover:text-[#111111] transition-colors"
                        >-</button>
                        <span className="px-3 py-1 text-xs border-x border-border-custom">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="px-3 py-1 text-text-muted hover:text-[#111111] transition-colors"
                        >+</button>
                      </div>
                      <button 
                        onClick={() => removeItem(item.id)}
                        className="text-[10px] uppercase tracking-widest font-medium text-red-500 hover:text-red-600 transition-colors"
                      >
                        Remove
                      </button>
                   </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="lg:col-span-4 mt-12 lg:mt-0">
            <div className="bg-bg-soft p-8 rounded-custom sticky top-24">
              <h2 className="text-[10px] uppercase tracking-widest font-medium text-[#111111] mb-6">Summary</h2>
              <div className="flex flex-col gap-4 mb-8 pb-8 border-b border-white">
                <div className="flex justify-between text-sm">
                  <span className="text-text-muted font-light">Subtotal</span>
                  <span className="text-[#111111]">${totalPrice().toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-text-muted font-light">Shipping</span>
                  <span className="text-green-600 font-medium">Free</span>
                </div>
              </div>
              <div className="flex justify-between items-baseline mb-8">
                <span className="text-sm font-medium">Total</span>
                <span className="text-2xl font-display text-[#111111]">${totalPrice().toFixed(2)}</span>
              </div>
              <button className="btn btn-primary btn-lg w-full justify-center">
                Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
