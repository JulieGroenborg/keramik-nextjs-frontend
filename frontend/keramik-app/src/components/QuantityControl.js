'use client';
import { useState } from 'react';
import styles from '../css/components/QuantityControl.module.css';

export default function QuantityStepper({ stock, initial = 1, onChange }) {
  const [quantity, setQuantity] = useState(initial);

  // sænker antal (går aldrig under 1)
  const handleDecrement = () => {
    setQuantity((prev) => {
      const next = prev > 1 ? prev - 1 : 1;
      if (onChange) onChange(next);
      return next;
    });
  };

  // øger antal (går aldrig over stock)
  const handleIncrement = () => {
    setQuantity((prev) => {
      const next = prev < stock ? prev + 1 : prev;
      if (onChange) onChange(next);
      return next;
    });
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
