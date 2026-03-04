import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCartStore } from "../store/cartStore";
import { checkoutSchema, type CheckoutFormData } from "../lib/validations";

const Checkout = () => {
  const navigate = useNavigate();
  const { items, totalPrice, clearCart } = useCartStore();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema)
  });

  const timer1 = useRef<ReturnType<typeof setTimeout> | null>(null);
  const timer2 = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Clean up timers if the component unmounts mid-checkout
  useEffect(() => {
    return () => {
      if (timer1.current) clearTimeout(timer1.current);
      if (timer2.current) clearTimeout(timer2.current);
    };
  }, []);

  const onSubmit = () => {
    setIsProcessing(true);

    timer1.current = setTimeout(() => {
      setIsProcessing(false);
      setIsComplete(true);
      clearCart();

      timer2.current = setTimeout(() => {
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
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-10">
              <h2 className="text-[10px] uppercase tracking-[0.2em] font-medium text-[#111111] mb-6">Contact Information</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] uppercase tracking-widest text-text-muted">First Name</label>
                  <input
                    type="text"
                    {...register("firstName")}
                    className="w-full px-4 py-3 border border-border-custom rounded-custom focus:outline-none focus:border-[#111111] text-sm"
                  />
                  {errors.firstName && (
                    <p className="text-xs text-red-500 mt-1">{errors.firstName.message}</p>
                  )}
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] uppercase tracking-widest text-text-muted">Last Name</label>
                  <input
                    type="text"
                    {...register("lastName")}
                    className="w-full px-4 py-3 border border-border-custom rounded-custom focus:outline-none focus:border-[#111111] text-sm"
                  />
                  {errors.lastName && (
                    <p className="text-xs text-red-500 mt-1">{errors.lastName.message}</p>
                  )}
                </div>
              </div>
              <div className="mt-4 flex flex-col gap-2">
                <label className="text-[10px] uppercase tracking-widest text-text-muted">Email</label>
                <input
                  type="email"
                  {...register("email")}
                  className="w-full px-4 py-3 border border-border-custom rounded-custom focus:outline-none focus:border-[#111111] text-sm"
                />
                {errors.email && (
                  <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>
                )}
              </div>
            </div>

            <div className="mb-10">
              <h2 className="text-[10px] uppercase tracking-[0.2em] font-medium text-[#111111] mb-6">Shipping Address</h2>
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] uppercase tracking-widest text-text-muted">Address</label>
                  <input
                    type="text"
                    {...register("address")}
                    className="w-full px-4 py-3 border border-border-custom rounded-custom focus:outline-none focus:border-[#111111] text-sm"
                  />
                  {errors.address && (
                    <p className="text-xs text-red-500 mt-1">{errors.address.message}</p>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] uppercase tracking-widest text-text-muted">City</label>
                    <input
                      type="text"
                      {...register("city")}
                      className="w-full px-4 py-3 border border-border-custom rounded-custom focus:outline-none focus:border-[#111111] text-sm"
                    />
                    {errors.city && (
                      <p className="text-xs text-red-500 mt-1">{errors.city.message}</p>
                    )}
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] uppercase tracking-widest text-text-muted">ZIP Code</label>
                    <input
                      type="text"
                      {...register("zipCode")}
                      className="w-full px-4 py-3 border border-border-custom rounded-custom focus:outline-none focus:border-[#111111] text-sm"
                    />
                    {errors.zipCode && (
                      <p className="text-xs text-red-500 mt-1">{errors.zipCode.message}</p>
                    )}
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
                    {...register("cardNumber")}
                    placeholder="**** **** **** ****"
                    className="w-full px-4 py-3 border border-border-custom rounded-custom focus:outline-none focus:border-[#111111] text-sm"
                  />
                  {errors.cardNumber && (
                    <p className="text-xs text-red-500 mt-1">{errors.cardNumber.message}</p>
                  )}
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] uppercase tracking-widest text-text-muted">Name on Card</label>
                  <input
                    type="text"
                    {...register("cardName")}
                    className="w-full px-4 py-3 border border-border-custom rounded-custom focus:outline-none focus:border-[#111111] text-sm"
                  />
                  {errors.cardName && (
                    <p className="text-xs text-red-500 mt-1">{errors.cardName.message}</p>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] uppercase tracking-widest text-text-muted">Expiry</label>
                    <input
                      type="text"
                      {...register("expiry")}
                      placeholder="MM/YY"
                      className="w-full px-4 py-3 border border-border-custom rounded-custom focus:outline-none focus:border-[#111111] text-sm"
                    />
                    {errors.expiry && (
                      <p className="text-xs text-red-500 mt-1">{errors.expiry.message}</p>
                    )}
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] uppercase tracking-widest text-text-muted">CVV</label>
                    <input
                      type="text"
                      {...register("cvv")}
                      placeholder="***"
                      className="w-full px-4 py-3 border border-border-custom rounded-custom focus:outline-none focus:border-[#111111] text-sm"
                    />
                    {errors.cvv && (
                      <p className="text-xs text-red-500 mt-1">{errors.cvv.message}</p>
                    )}
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
                    <div className="font-medium text-[#111111]">{item.title}</div>
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