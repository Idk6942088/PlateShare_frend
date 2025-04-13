import { useState, useEffect } from 'react';

export function useCart() {
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('cart');
      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      console.error('Error parsing cart data:', error);
      return [];
    }
  });

  // Kosár mentése localStorage-ba változás esetén
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  // Termék hozzáadása a kosárhoz
  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  // Termék eltávolítása a kosárból
  const removeFromCart = (id) => {
    setCart(prev => prev.filter(item => item.id !== id) );
  };

  // Mennyiség csökkentése (ha 1 marad, törli)
  const decreaseQuantity = (id) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === id);
      if (existing && existing.quantity > 1) {
        return prev.map(item =>
          item.id === id 
            ? { ...item, quantity: item.quantity - 1 } 
            : item
        );
      }
      return prev.filter(item => item.id !== id);
    });
  };

  // Mennyiség növelése
  const increaseQuantity = (id) => {
    setCart(prev => 
      prev.map(item =>
        item.id === id 
          ? { ...item, quantity: item.quantity + 1 } 
          : item
      )
    );
  };

  // Kosár teljes ürítése
  const clearCart = () => {
    setCart([]);
  };

  // Összes termék darabszáma
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  // Összesített ár számítása
  const cartTotal = cart.reduce(
    (acc, item) => acc + (item.price * item.quantity),
    0
  ).toFixed(2);

  // Kosár frissítése localStorage-ból
  const refreshCart = () => {
    try {
      const saved = localStorage.getItem('cart');
      setCart(saved ? JSON.parse(saved) : []);
    } catch (error) {
      console.error('Error refreshing cart:', error);
    }
  };

  return { 
    cart, 
    addToCart, 
    removeFromCart, 
    decreaseQuantity, 
    increaseQuantity, 
    clearCart, 
    cartCount, 
    cartTotal, 
    refreshCart 
  };
}