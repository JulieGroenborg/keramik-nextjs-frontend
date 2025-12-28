'use client'; // Client side fordi vi bruger useContext and onClick.
import { useContext, useEffect } from 'react';
import { CartContext } from '@/lib/context/CartContext';
import BasketIcon from '@/components/icons/BasketIcon';
import styles from '../css/components/AddToBasket.module.css';

export default function AddToBasket({
  // Vi sætter quantity til 1, den bliver overskrevet, hvis en bruger vælger flere produkter på produktsiden.
  product,
  quantity = 1,
  variant = 'large',
  onAdd,
  currentStock,
}) {
  // Henter den globale cart state, setCart og updateItemStock fra CartContext:
  const { cart, setCart, updateItemStock } = useContext(CartContext);

  // Vi sikrer os at vi altid bruger det nyeste lager tal
  const stockQuantity =
    currentStock !== undefined ? currentStock : (product.properties.stockQuantity ?? 0);

  // Dette bruges til at synkronisere lagertallet i kurven med det levende lager tal, så man ikke fx kan overskride lageret i kurven
  // Hver gang currentStock (SSE) ændrer sig, opdaterer vi også lagertallet for varen inde i kurven.
  useEffect(() => {
    if (currentStock !== undefined && updateItemStock) {
      updateItemStock(product.id, currentStock);
    }
  }, [currentStock, product.id, updateItemStock]);

  // Find ud af hvor mange af denne vare der allerede er i kurven
  const existingItem = cart.items.find((item) => item.productId === product.id);
  const currentInCart = existingItem ? existingItem.quantity : 0;

  // Er varen helt udsolgt?
  const isOutOfStock = stockQuantity <= 0;

  // Vi tjekker om (antal i kurv + det valgte antal) overstiger det "levende" lager.
  // Vi bruger '>' i stedet for '>=' så man rent faktisk kan købe den sidste vare på lager.
  const isMaxInCart = Number(currentInCart) + Number(quantity) > stockQuantity;

  const handleAddToCart = () => {
    // Ekstra sikkerhedstjek: Stop hvis der ikke er nok på lager
    if (isMaxInCart) {
      alert(`Beklager, der er kun ${stockQuantity} stk. på lager.`);
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
            stock: stockQuantity, // Gemmer det nyeste SSE-lagertal i kurven
          },
        ],
      });
    }

    // Nulstiller QuantityControl i ProductActions efter tilføjelse
    if (onAdd) onAdd();
  };

  // Hjælpevariabel til knap-tekst og tilstand
  const isDisabled = isOutOfStock || isMaxInCart;
  const buttonText = isOutOfStock
    ? 'Udsolgt'
    : isMaxInCart
      ? 'Ikke nok på lager' // Mere generisk tekst som requested
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
