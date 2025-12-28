'use client';
import { useState } from 'react';
import AddToBasket from './AddToBasket';
import QuantityControl from './QuantityControl';
import styles from '../css/components/ProductActions.module.css';

export default function ProductActions({ product, liveStock }) {
  // parent skal vide antal for at kunne sende det til AddToBasket
  const [quantity, setQuantity] = useState(1);

  // Vi bruger liveStock fra props. Hvis den ikke findes (fallback), bruger vi den oprindelige værdi.
  const currentStock = liveStock !== undefined ? liveStock : product.properties.stockQuantity;

  // Ny funktion: Denne nulstiller tælleren til 1.
  // Den skal kaldes inde fra din AddToBasket komponent efter varen er tilføjet.
  const handleReset = () => {
    setQuantity(1);
  };

  return (
    <div className={styles.container}>
      <div className={styles.stepperWrapper}>
        {/* Vi sender det levende lagertal til QuantityControl så man ikke kan vælge for mange */}
        {/* Vi bruver value istedet for initial så tallet lever på tværs af komponenter */}
        <QuantityControl stock={currentStock} value={quantity} onChange={setQuantity} />

        {/* Her opdateres teksten nu live */}
        {/* Hele <p> tagget renderes kun, hvis currentStock er højere end 0 */}
        {currentStock > 0 && <p className={styles.stockText}>{currentStock} på lager</p>}
      </div>

      <div className={styles.buttonWrapper}>
        {/* Vi deaktiverer knappen via CSS eller props i AddToBasket hvis lageret er 0 */}
        {/* Vi sender handleReset funktionen med som 'onAdd' prop for at nulstille tælleren efter man har trykket på knappen */}
        <AddToBasket
          product={product}
          quantity={quantity}
          currentStock={currentStock}
          disabled={currentStock <= 0}
          onAdd={handleReset}
        />
      </div>
    </div>
  );
}
