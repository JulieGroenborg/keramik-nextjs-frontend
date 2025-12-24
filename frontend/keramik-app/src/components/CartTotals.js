'use client';
import { useContext } from 'react';
import { CartContext } from '@/lib/context/CartContext';
import CheckoutButton from './CheckoutButton';
import styles from '../css/components/CartTotals.module.css';

export default function CartTotals({ mode }) {
  const { cart } = useContext(CartContext);

  const price = cart.items.reduce((sum, item) => sum + item.quantity * item.price, 0);
  const totalItems = cart.items.reduce((sum, item) => sum + item.quantity, 0);

  if (cart.items.length === 0) return null;

  return (
    <div>
      <div className={styles.summaryRow}>
        <span>I alt</span>
      </div>

      <div className={styles.totalRow}>
        <span>{totalItems}x Varer</span>
        <span>{price} DKK</span>
        <div className={styles.totalDivider} />
        <span className={styles.totalLabel}>Samlet beløb</span>
        <span className={styles.totalPrice}>{price} DKK</span>
      </div>

      <div className={styles.checkoutContainer}>
        <CheckoutButton mode={mode} />
      </div>
    </div>
  );
}
