'use client';
import { useContext, useEffect } from 'react';
import { CartContext } from '@/lib/context/CartContext';
import CartItem from './CartItem';
import CartTotals from './CartTotals';
import styles from '../css/components/CartDrawer.module.css';

export default function CartDrawer({ mode, onClose }) {
  const { cart } = useContext(CartContext);

  useEffect(() => {
    // lås scroll når drawer er åben
    document.body.style.overflow = 'hidden';
    return () => {
      // Åben op for scroll når drawer lukkes
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <>
      {/* Overlay bag drawer */}
      <div className={styles.overlay} onClick={onClose}></div>

      <div className={styles.drawer}>
        {/* Header */}
        <div className={styles.header}>
          <h2>Din kurv</h2>
          <button onClick={onClose} className={styles.closeButton}>
            &times;
          </button>
        </div>

        {/* Liste af varer */}
        <div className={styles.itemsList}>
          {cart.items.length === 0 ? (
            <p className={styles.emptyMessage}>Din kurv er tom</p>
          ) : (
            cart.items.map((item) => <CartItem key={item.productId} item={item} />)
          )}
        </div>

        {/* Footer af drawer sektionen */}
        {cart.items.length > 0 && (
          <div className={styles.footer}>
            <CartTotals mode={mode} />
          </div>
        )}
      </div>
    </>
  );
}
