'use client'; // Client side fordi vi bruger useContext and onClick.
import { useContext } from 'react';
import { CartContext } from '@/lib/context/CartContext';
import BasketIcon from '@/components/icons/BasketIcon';
import styles from '../css/components/AddToBasket.module.css';

export default function AddToBasket({ product, quantity = 1, variant = 'large' }) {
  // Vi sætter quantity til 1, den bliver overskrevet, hvis en bruger vælger flere produkter på produktsiden.
  // Henter den globale cart state og setCart funktionen fra CartContext:
  const { cart, setCart } = useContext(CartContext);

  // Funktionen der kaldes, når brugeren klikker på "Add to cart".
  const handleAddToCart = () => {
    // Tjekker om produktet allerede findes i kruven:
    const existingItem = cart.items.find((item) => item.productId === product.id);

    // Hvis produktet allerede er i kruven, øges quantity med det valgte antal:
    if (existingItem) {
      setCart({
        items: cart.items.map(
          (item) =>
            item.productId === product.id
              ? { ...item, quantity: item.quantity + quantity } // Opdater quantity.
              : item // Beholder de andre items uændret.
        ),
      });
    }
    // Hvis produktet ikke er i kurven, tilføjes det som nyt item:
    else {
      setCart({
        items: [
          ...cart.items, // Bevarer eksisterende items
          {
            productId: product.id,
            name: product.name,
            price: product.properties.price,
            quantity, // Antal valgt af brugeren
            image: product.properties.image?.[0]?.url || '',
            stock: product.properties.stockQuantity || 0,
          },
        ],
      });
    }
  };

  // --- Variant 1: Lille knap (List view) ---
  if (variant === 'small') {
    return (
      <button onClick={handleAddToCart} className={`${styles.buttonBase} ${styles.small}`}>
        <BasketIcon />
        Kurv
      </button>
    );
  }

  // --- Variant 2: Stor knap (Product view) ---
  return (
    <button onClick={handleAddToCart} className={`${styles.buttonBase} ${styles.large}`}>
      Tilføj til kurv
    </button>
  );
}
