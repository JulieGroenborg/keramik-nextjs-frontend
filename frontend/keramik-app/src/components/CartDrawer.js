'use client';
import { useContext, useEffect } from 'react';
import { CartContext } from '@/lib/context/CartContext';
import Image from 'next/image';
import CheckoutButton from './CheckoutButton';
import QuantityControl from './QuantityControl';
import styles from '../css/components/CartDrawer.module.css';

export default function CartDrawer({ mode, onClose }) {
  const { cart, increaseQuantity, decreaseQuantity, removeItem } = useContext(CartContext);

  // Scroll-lock når drawer er åben
  useEffect(() => {
    // lås scroll
    document.body.style.overflow = 'hidden';

    // frigør scroll når draweren lukkes
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  const totalPrice = cart.items.reduce((sum, item) => sum + item.quantity * item.price, 0);

  return (
    <>
      {/* Overlay - så man kan klikke udenfor for at lukke */}
      <div className={styles.overlay} onClick={onClose}></div>

      {/*  CartDraweren */}
      <div className={styles.drawer}>
        <div className={styles.header}>
          <h2>Din kurv</h2>
          <button onClick={onClose} className={styles.closeButton}>
            &times;
          </button>
        </div>

        <div className={styles.itemsList}>
          {cart.items.length === 0 ? (
            <p className={styles.emptyMessage}>Din kurv er tom</p>
          ) : (
            cart.items.map((item) => (
              <div key={item.productId} className={styles.item}>
                {/* Billede */}
                <div className={styles.imageWrapper}>
                  <Image
                    src={`${process.env.NEXT_PUBLIC_UMBRACO_MEDIA_URL}${item.image}`}
                    alt={item.name}
                    width={120} /* Hent den største størrelse (desktop) for at sikre kvalitet */
                    height={120} /* Hent den største størrelse (desktop) for at sikre kvalitet */
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    }} /* CSS bestemmer den faktiske visning */
                  />
                </div>

                {/* Detaljer */}
                <div className={styles.itemDetails}>
                  <div>
                    <p className={styles.productName}>{item.name}</p>
                    <p className={styles.price}>{item.price} DKK</p>
                  </div>

                  {/* Din QuantityControl */}
                  <div style={{ marginTop: '10px' }}>
                    <QuantityControl
                      initial={item.quantity}
                      stock={item.stock || 99} // Fallback hvis stock mangler
                      onChange={(newQty) => {
                        // Sammenlign nyt tal med nuværende for at se om vi skal øge eller sænke
                        if (newQty > item.quantity) {
                          increaseQuantity(item.productId);
                        } else if (newQty < item.quantity) {
                          decreaseQuantity(item.productId);
                        }
                      }}
                    />
                  </div>
                </div>

                {/* Slet knap */}
                <button onClick={() => removeItem(item.productId)} className={styles.removeButton}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                    <path
                      fillRule="evenodd"
                      d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
                    />
                  </svg>
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {cart.items.length > 0 && (
          <div className={styles.footer}>
            <div className={styles.summaryRow}>
              <span>I alt (ekskl. levering)</span>
              <span>{totalPrice} DKK</span>
            </div>

            <div className={styles.totalRow}>
              <span>Samlet beløb</span>
              <span>{totalPrice} DKK</span>
            </div>

            <div className={styles.checkoutContainer}>
              <CheckoutButton mode={mode} />
            </div>
          </div>
        )}
      </div>
    </>
  );
}
