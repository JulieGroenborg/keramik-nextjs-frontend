'use client';
import { useState, useEffect } from 'react';
import styles from '../css/components/QuantityControl.module.css';

export default function QuantityControl({ stock, initial = 1, onChange }) {
  const [quantity, setQuantity] = useState(initial);

  // hver gang quantity ændrer sig, giver vi besked til parent
  useEffect(() => {
    if (onChange) {
      onChange(quantity);
    }
  }, [quantity, onChange]);

  // sænker antal (går aldrig under 1)
  const handleDecrement = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

  // øger antal (går aldrig over stock)
  const handleIncrement = () => {
    setQuantity((prev) => (prev < stock ? prev + 1 : prev));
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
