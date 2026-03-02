import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCartStore } from "../store/cartStore";

const Checkout = () => {
  const navigate = useNavigate();
  const { items, totalPrice, clearCart } = useCartStore();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    city: "",
    zipCode: "",
    cardNumber: "",
    cardName: "",
    expiry: "",
    cvv: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    setTimeout(() => {
      setIsProcessing(false);
      setIsComplete(true);
      clearCart();
      
      setTimeout(() => {
        navigate("/");
      }, 3000);
    }, 2000);
  };

  if (items.length === 0 && !isComplete) {
    return (
      <div className="max-w-[1280px] mx-auto px-8 py-16 text-center">
        <h1 className="font-display text-4xl mb-4">Checkout</h1>
        <p className="text-text-muted mb-8">Your cart is empty.</p>
        <button onClick={() => navigate("/products")} className="btn btn-primary">
          Continue Shopping
        </button>
      </div>
    );
  }

  if (isComplete) {
    return (
      <div className="max-w-[1280px] mx-auto px-8 py-16 text-center">
        <div className="mb-8 text-6xl">🎉</div>
        <h1 className="font-display text-4xl mb-4">Thank You!</h1>
        <p className="text-text-muted mb-8">Your order has been placed successfully.</p>
        <p className="text-sm text-text-muted">Redirecting you to home...</p>
      </div>
    );
  }

  return (
    <div className="max-w-[1280px] mx-auto px-8 py-16">
      <h1 className="font-display text-4xl mb-4">Checkout</h1>
      <p className="text-text-muted font-light mb-12">Complete your purchase.</p>

      <div className="lg:grid lg:grid-cols-3 lg:gap-16">
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit}>
            <div className="mb-10">
              <h2 className="text-[10px] uppercase tracking-[0.2em] font-medium text-[#111111] mb-6">Contact Information</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] uppercase tracking-widest text-text-muted">First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-border-custom rounded-custom focus:outline-none focus:border-[#111111] text-sm"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] uppercase tracking-widest text-text-muted">Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-border-custom rounded-custom focus:outline-none focus:border-[#111111] text-sm"
                  />
                </div>
              </div>
              <div className="mt-4 flex flex-col gap-2">
                <label className="text-[10px] uppercase tracking-widest text-text-muted">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-border-custom rounded-custom focus:outline-none focus:border-[#111111] text-sm"
                />
              </div>
            </div>

            <div className="mb-10">
              <h2 className="text-[10px] uppercase tracking-[0.2em] font-medium text-[#111111] mb-6">Shipping Address</h2>
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] uppercase tracking-widest text-text-muted">Address</label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-border-custom rounded-custom focus:outline-none focus:border-[#111111] text-sm"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] uppercase tracking-widest text-text-muted">City</label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-border-custom rounded-custom focus:outline-none focus:border-[#111111] text-sm"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] uppercase tracking-widest text-text-muted">ZIP Code</label>
                    <input
                      type="text"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-border-custom rounded-custom focus:outline-none focus:border-[#111111] text-sm"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-10">
              <h2 className="text-[10px] uppercase tracking-[0.2em] font-medium text-[#111111] mb-6">Payment Details</h2>
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] uppercase tracking-widest text-text-muted">Card Number</label>
                  <input
                    type="text"
                    name="cardNumber"
                    value={formData.cardNumber}
                    onChange={handleChange}
                    required
                    placeholder="**** **** **** ****"
                    className="w-full px-4 py-3 border border-border-custom rounded-custom focus:outline-none focus:border-[#111111] text-sm"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] uppercase tracking-widest text-text-muted">Name on Card</label>
                  <input
                    type="text"
                    name="cardName"
                    value={formData.cardName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-border-custom rounded-custom focus:outline-none focus:border-[#111111] text-sm"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] uppercase tracking-widest text-text-muted">Expiry</label>
                    <input
                      type="text"
                      name="expiry"
                      value={formData.expiry}
                      onChange={handleChange}
                      required
                      placeholder="MM/YY"
                      className="w-full px-4 py-3 border border-border-custom rounded-custom focus:outline-none focus:border-[#111111] text-sm"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] uppercase tracking-widest text-text-muted">CVV</label>
                    <input
                      type="text"
                      name="cvv"
                      value={formData.cvv}
                      onChange={handleChange}
                      required
                      placeholder="***"
                      className="w-full px-4 py-3 border border-border-custom rounded-custom focus:outline-none focus:border-[#111111] text-sm"
                    />
                  </div>
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={isProcessing}
              className="w-full btn btn-primary btn-lg py-4 disabled:opacity-50"
            >
              {isProcessing ? "Processing..." : `Pay $${totalPrice().toFixed(2)}`}
            </button>
          </form>
        </div>

        <div className="lg:col-span-1 mt-12 lg:mt-0">
          <div className="bg-bg-soft p-8 rounded-custom sticky top-24">
            <h2 className="text-[10px] uppercase tracking-widest font-medium text-[#111111] mb-6">Order Summary</h2>
            
            <div className="flex flex-col gap-4 mb-6 max-h-[300px] overflow-y-auto">
              {items.map((item) => (
                <div key={item.id} className="flex gap-3">
                  <div className="w-12 h-12 bg-white rounded-custom p-2 shrink-0">
                    <img src={item.image} alt={item.title} className="max-h-full max-w-full object-contain" />
                  </div>
                  <div className="flex-1 text-xs">
                    <div className="font-medium text-[#111111] line-clamp-1">{item.title}</div>
                    <div className="text-text-muted">Qty: {item.quantity}</div>
                  </div>
                  <div className="text-xs font-medium">${(item.price * item.quantity).toFixed(2)}</div>
                </div>
              ))}
            </div>

            <div className="border-t border-white pt-6">
              <div className="flex justify-between text-sm mb-3">
                <span className="text-text-muted">Subtotal</span>
                <span className="text-[#111111]">${totalPrice().toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm mb-3">
                <span className="text-text-muted">Shipping</span>
                <span className="text-green-600">Free</span>
              </div>
              <div className="flex justify-between text-base font-medium mt-4 pt-4 border-t border-white">
                <span>Total</span>
                <span className="font-display">${totalPrice().toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;