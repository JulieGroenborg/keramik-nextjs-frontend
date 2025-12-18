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

  return (
    <div className={styles.container}>
      <div className={styles.stepperWrapper}>
        <QuantityControl stock={stock} initial={1} onChange={setQuantity} />

        <p className={styles.stockText}>{stock} på lager</p>
      </div>

      <div className={styles.buttonWrapper}>
        <AddToBasket product={product} quantity={quantity} />
      </div>
    </div>
  );
}
