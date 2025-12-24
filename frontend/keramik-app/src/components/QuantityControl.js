'use client';
import { useState } from 'react';
import styles from '../css/components/QuantityControl.module.css';

export default function QuantityControl({ stock, initial = 1, onChange }) {
  const [quantity, setQuantity] = useState(initial);

  const handleDecrement = () => {
    if (quantity > 1) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      if (onChange) onChange(newQuantity);
    }
  };

  const handleIncrement = () => {
    if (quantity < stock) {
      const newQuantity = quantity + 1;
      setQuantity(newQuantity);
      if (onChange) onChange(newQuantity);
    }
  };

  return (
    <div className={styles.stepper}>
      <button
        type="button"
        onClick={handleDecrement}
        className={styles.stepperBtn}
        disabled={quantity <= 1}
      >
        -
      </button>

      <span className={styles.quantityDisplay}>{quantity}</span>

      <button
        type="button"
        onClick={handleIncrement}
        className={styles.stepperBtn}
        disabled={quantity >= stock}
      >
        +
      </button>
    </div>
  );
}
