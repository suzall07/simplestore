import { useCartStore } from "../store/cartStore";

export const useCart = () => {
  const { 
    items, 
    addItem, 
    removeItem, 
    updateQuantity, 
    clearCart,
    totalItems,
    totalPrice 
  } = useCartStore();
  
  const itemCount = totalItems();
  const cartTotal = totalPrice();
  const isEmpty = items.length === 0;
  
  return {
    items,
    itemCount,
    cartTotal,
    isEmpty,
    addItem,
    removeItem,
    updateQuantity,
    clearCart
  };
};