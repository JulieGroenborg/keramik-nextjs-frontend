'use client';
import { useState } from 'react';
import AddToBasket from './AddToBasket';
import QuantityControl from './QuantityControl';
import styles from '../css/components/ProductActions.module.css';

export default function ProductActions({ product }) {
  // parent skal vide antal for at kunne sende det til AddToBasket
  const [quantity, setQuantity] = useState(1);

  // hvor mange er der på lager
  const stock = product.properties.stockQuantity;

  // Ny funktion: Denne nulstiller tælleren til 1.
  // Den skal kaldes inde fra din AddToBasket komponent efter varen er tilføjet.
  const handleReset = () => {
    setQuantity(1);
  };

  return (
    <div className={styles.container}>
      <div className={styles.stepperWrapper}>
        <QuantityControl stock={stock} value={quantity} onChange={setQuantity} />

        <p className={styles.stockText}>{stock} på lager</p>
      </div>

      <div className={styles.buttonWrapper}>
        {/* Vi deaktiverer knappen via CSS eller props i AddToBasket hvis lageret er 0 */}
        {/* Vi sender handleReset funktionen med som 'onAdd' prop for at nulstille tælleren efter man har trykket på knappen */}
        <AddToBasket
          product={product}
          quantity={quantity}
          stock={stock}
          disabled={stock <= 0}
          onAdd={handleReset}
        />
      </div>
    </div>
  );
}
