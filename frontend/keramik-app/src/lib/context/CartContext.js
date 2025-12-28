'use client';
import { createContext, useState, useEffect } from 'react';

// createContext() creates a global container for our cart state.
export const CartContext = createContext();

export function CartProvider({ children }) {
  // Initialiserer cart state fra localStorage, eller start med en tom kurv, hvis der ikke er noget gemt.
  // Bruger en funktion i useState, så dette kun køres én gang, når komponenten mountes.
  const [cart, setCart] = useState(() => {
    // Tjekker om vi er i browseren (window eksisterer), fordi localStorage ikke findes på serveren.
    if (typeof window !== 'undefined') {
      // Forsøg at læse den gemte kurv fra localStorage
      const storedCart = localStorage.getItem('cart');

      // Hvis der findes en kurv i localStorage, parse den til et objekt; ellers start med en tom kurv
      return storedCart ? JSON.parse(storedCart) : { items: [] };
    }

    // Fallback for server-side rendering: start med en tom kurv
    return { items: [] };
  });

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

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
        .filter((item) => item.quantity > 0), // remove if 0
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
