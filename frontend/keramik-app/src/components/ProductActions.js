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

  return (
    <div className={styles.container}>
      <div className={styles.stepperWrapper}>
        {/* Vi sender det levende lagertal til QuantityControl så man ikke kan vælge for mange */}
        <QuantityControl stock={currentStock} initial={1} onChange={setQuantity} />

        {/* Her opdateres teksten nu live */}
        {/* Hele <p> tagget renderes kun, hvis currentStock er højere end 0 */}
        {currentStock > 0 && <p className={styles.stockText}>{currentStock} på lager</p>}
      </div>

      <div className={styles.buttonWrapper}>
        {/* Vi deaktiverer knappen via CSS eller props i AddToBasket hvis lageret er 0 */}
        <AddToBasket product={product} quantity={quantity} disabled={currentStock <= 0} />
      </div>
    </div>
  );
}
