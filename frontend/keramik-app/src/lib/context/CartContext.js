'use client';
import { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export function CartProvider({ children }) {
  // Start med tom kurv for at undgå hydration fejl, da localStorage kun findes i browseren, men next.js forsøger at generere HTML på serveren (SSR)
  const [cart, setCart] = useState({ items: [] });
  const [isLoaded, setIsLoaded] = useState(false);

  // 1. Henter data fra localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedCart = localStorage.getItem('cart');
      if (storedCart) {
        try {
          const parsedCart = JSON.parse(storedCart);
          // Vi ignorerer advarslen, da vi bevidst kun ønsker at synkronisere browserens localStorage med vores state én gang efter initial render.
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

  // 2. Gem data til localStorage
  useEffect(() => {
    // Gem kun i state, hvis vi er færdige med at indlæse
    if (isLoaded) {
      localStorage.setItem('cart', JSON.stringify(cart));
    }
  }, [cart, isLoaded]);

  // Opdaterer lagerstatus for en specifik vare i kurven. Bruges til at synkronisere kurven med realtidsdata (SSE), så brugeren ikke kan tilføje flere varer, end der rent faktisk er på lager.
  function updateItemStock(productId, newStock) {
    setCart((prev) => ({
      items: prev.items.map((item) =>
        item.productId === productId ? { ...item, stock: newStock } : item
      ),
    }));
  }

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
        updateItemStock,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
