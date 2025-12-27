'use client'; // Client side fordi vi bruger useContext and onClick.
import { useContext } from 'react';
import { CartContext } from '@/lib/context/CartContext';
import BasketIcon from '@/components/icons/BasketIcon';
import styles from '../css/components/AddToBasket.module.css';

export default function AddToBasket({ product, quantity = 1, variant = 'large' }) {
  // Vi sætter quantity til 1, den bliver overskrevet, hvis en bruger vælger flere produkter på produktsiden.
  // Henter den globale cart state og setCart funktionen fra CartContext:
  const { cart, setCart } = useContext(CartContext);

  // Henter lagerstatus fra produktets properties (Umbraco data)
  const stockQuantity = product.properties.stockQuantity ?? 0;

  // Find ud af hvor mange af denne vare der allerede er i kurven
  const existingItem = cart.items.find((item) => item.productId === product.id);
  const currentInCart = existingItem ? existingItem.quantity : 0;

  // Er varen helt udsolgt?
  const isOutOfStock = stockQuantity <= 0;

  // Har brugeren allerede lagt alt det tilgængelige lager i kurven?
  const isMaxInCart = currentInCart + quantity > stockQuantity;

  const handleAddToCart = () => {
    // Ekstra sikkerhedstjek: Stop hvis der ikke er nok på lager
    if (isMaxInCart) {
      alert(`Beklager, der er kun ${stockQuantity} stk. på lager af denne vare.`);
      return;
    }

    if (existingItem) {
      setCart({
        items: cart.items.map((item) =>
          item.productId === product.id ? { ...item, quantity: item.quantity + quantity } : item
        ),
      });
    } else {
      setCart({
        items: [
          ...cart.items,
          {
            productId: product.id,
            name: product.name,
            price: product.properties.price,
            quantity,
            image: product.properties.image?.[0]?.url || '',
            stock: product.properties.stockQuantity || 0,
          },
        ],
      });
    }
  };

  // Hjælpevariabel til knap-tekst og tilstand
  const isDisabled = isOutOfStock || isMaxInCart;
  const buttonText = isOutOfStock
    ? 'Udsolgt'
    : isMaxInCart
      ? 'Alt på lager er i kurv'
      : variant === 'small'
        ? 'Kurv'
        : 'Tilføj til kurv';

  // --- Variant 1: Lille knap (List view) ---
  if (variant === 'small') {
    return (
      <button
        onClick={handleAddToCart}
        disabled={isDisabled}
        className={`${styles.buttonBase} ${styles.small} ${isDisabled ? styles.disabled : ''}`}
      >
        <BasketIcon />
        {variant === 'small' && !isOutOfStock ? 'Kurv' : buttonText}
      </button>
    );
  }

  // --- Variant 2: Stor knap (Product view) ---
  return (
    <button
      onClick={handleAddToCart}
      disabled={isDisabled}
      className={`${styles.buttonBase} ${styles.large} ${isDisabled ? styles.disabled : ''}`}
    >
      {buttonText}
    </button>
  );
}
