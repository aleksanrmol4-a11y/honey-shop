import { createContext, useContext, useMemo, useCallback } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useLocalStorage('honey_cart', []);

  const addToCart = useCallback((product, weight, quantity = 1) => {
    setItems((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.productId === product.id && item.weightValue === weight.value
      );

      if (existingIndex >= 0) {
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + quantity,
        };
        return updated;
      }

      return [
        ...prev,
        {
          productId: product.id,
          weightValue: weight.value,
          quantity,
          priceAtAdd: product.pricePerKg * weight.coefficient,
        },
      ];
    });
  }, [setItems]);

  const removeFromCart = useCallback((productId, weightValue) => {
    setItems((prev) =>
      prev.filter((item) => !(item.productId === productId && item.weightValue === weightValue))
    );
  }, [setItems]);

  const updateQuantity = useCallback((productId, weightValue, quantity) => {
    if (quantity < 1) {
      removeFromCart(productId, weightValue);
      return;
    }

    setItems((prev) =>
      prev.map((item) =>
        item.productId === productId && item.weightValue === weightValue
          ? { ...item, quantity }
          : item
      )
    );
  }, [setItems, removeFromCart]);

  const clearCart = useCallback(() => {
    setItems([]);
  }, [setItems]);

  const totalCount = useMemo(
    () => items.reduce((sum, item) => sum + item.quantity, 0),
    [items]
  );

  const totalPrice = useMemo(
    () => items.reduce((sum, item) => sum + item.priceAtAdd * item.quantity, 0),
    [items]
  );

  const value = useMemo(
    () => ({
      items,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      totalCount,
      totalPrice,
    }),
    [items, addToCart, removeFromCart, updateQuantity, clearCart, totalCount, totalPrice]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
