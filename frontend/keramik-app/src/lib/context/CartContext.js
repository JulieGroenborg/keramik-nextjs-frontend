'use client';
import { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export function CartProvider({ children }) {
  // Start med tom kurv for at undgå hydration fejl
  const [cart, setCart] = useState({ items: [] });
  const [isLoaded, setIsLoaded] = useState(false);

  // 1. Hent data
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedCart = localStorage.getItem('cart');
      if (storedCart) {
        try {
          const parsedCart = JSON.parse(storedCart);
          // Vi beder linteren ignorere advarslen her, da vi ved, vi kun kører dette ved mount
          // eslint-disable-next-line
          setCart(parsedCart);
        } catch (error) {
          console.error('Fejl ved parsing af kurv:', error);
        }
      }
      // Vi er færdige med at loade
      setIsLoaded(true);
    }
  }, []); // Vi ignorerer dependency array advarslen her

  // 2. Gem data
  useEffect(() => {
    // Gem kun hvis vi er færdige med at indlæse
    if (isLoaded) {
      localStorage.setItem('cart', JSON.stringify(cart));
    }
  }, [cart, isLoaded]);

  // Øger quantity
  function increaseQuantity(productId) {
    setCart((prev) => ({
      items: prev.items.map((item) =>
        item.productId === productId ? { ...item, quantity: item.quantity + 1 } : item
      ),
    }));
  }

  // Reducerer quantity
  function decreaseQuantity(productId) {
    setCart((prev) => ({
      items: prev.items
        .map((item) =>
          item.productId === productId ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0),
    }));
  }

  // Fjern item helt
  function removeItem(productId) {
    setCart((prev) => ({
      items: prev.items.filter((item) => item.productId !== productId),
    }));
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        setCart,
        increaseQuantity,
        decreaseQuantity,
        removeItem,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
