import { Link } from "react-router-dom";

const Cart = () => {
  // Mock cart data for UI demonstration
  const cartItems = []; 

  return (
    <div className="max-w-[1280px] mx-auto px-8 py-16 lg:py-24">
      <div className="mb-16">
        <h1 className="font-display text-4xl text-[#111111] mb-4">Cart</h1>
        <p className="text-text-muted font-light">Review your selection before checkout.</p>
      </div>

      {cartItems.length === 0 ? (
        <div className="py-20 text-center border-t border-border-custom">
          <div className="text-4xl mb-6">🛒</div>
          <p className="text-text-muted font-light mb-10">Your cart is currently empty.</p>
          <Link to="/products" className="btn btn-primary btn-lg">
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="lg:grid lg:grid-cols-12 lg:gap-16">
          {/* Cart items list would go here */}
          <div className="lg:col-span-8">
            {/* List implementation */}
          </div>
          
          {/* Summary */}
          <div className="lg:col-span-4 mt-12 lg:mt-0">
            <div className="bg-bg-soft p-8 rounded-custom">
              <h2 className="text-[10px] uppercase tracking-widest font-medium text-[#111111] mb-6">Summary</h2>
              <div className="flex flex-col gap-4 mb-8 pb-8 border-b border-white">
                <div className="flex justify-between text-sm">
                  <span className="text-text-muted font-light">Subtotal</span>
                  <span className="text-[#111111]">$0.00</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-text-muted font-light">Shipping</span>
                  <span className="text-green-600 font-medium">Free</span>
                </div>
              </div>
              <div className="flex justify-between items-baseline mb-8">
                <span className="text-sm font-medium">Total</span>
                <span className="text-2xl font-display text-[#111111]">$0.00</span>
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
