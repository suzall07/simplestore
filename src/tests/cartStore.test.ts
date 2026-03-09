import { describe, it, expect, beforeEach } from "vitest";
import { useCartStore } from "../store/cartStore";

const mockProduct = {
  id: 1,
  title: "Test Product",
  price: 29.99,
  image: "test.jpg",
  category: "test",
  description: "A test product description",
  rating: { rate: 4.5, count: 10 }
};

describe("cartStore", () => {
  beforeEach(() => {
    useCartStore.setState({ items: [] });
  });

  it("should add item to cart", () => {
    const { addItem } = useCartStore.getState();
    
    addItem(mockProduct);
    
    const items = useCartStore.getState().items;
    expect(items.length).toBe(1);
    expect(items[0].id).toBe(1);
    expect(items[0].quantity).toBe(1);
  });

  it("should increase quantity when adding same item", () => {
    const { addItem } = useCartStore.getState();
    
    addItem(mockProduct);
    addItem(mockProduct);
    
    const items = useCartStore.getState().items;
    expect(items.length).toBe(1);
    expect(items[0].quantity).toBe(2);
  });

  it("should calculate total price correctly", () => {
    const { addItem, totalPrice } = useCartStore.getState();
    
    addItem(mockProduct);
    addItem({ ...mockProduct, id: 2, price: 19.99 });
    
    expect(totalPrice()).toBe(49.98);
  });

  it("should remove item from cart", () => {
    const { addItem, removeItem } = useCartStore.getState();
    
    addItem(mockProduct);
    removeItem(1);
    
    const items = useCartStore.getState().items;
    expect(items.length).toBe(0);
  });

  it("should update item quantity", () => {
    const { addItem, updateQuantity } = useCartStore.getState();
    
    addItem(mockProduct);
    updateQuantity(1, 5);
    
    const items = useCartStore.getState().items;
    expect(items[0].quantity).toBe(5);
  });

  it("should clear cart", () => {
    const { addItem, clearCart } = useCartStore.getState();
    
    addItem(mockProduct);
    addItem({ ...mockProduct, id: 2 });
    clearCart();
    
    const items = useCartStore.getState().items;
    expect(items.length).toBe(0);
  });
});