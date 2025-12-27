'use client';

import { useContext } from 'react';
import { CartContext } from '@/lib/context/CartContext';
import CartItem from '@/components/CartItem';
import CartTotals from '@/components/CartTotals';
import pageStyles from '../css/components/CartPage.module.css';
import drawerStyles from '../css/components/CartDrawer.module.css';

export default function CartView() {
  const { cart } = useContext(CartContext);

  return (
    <div className={pageStyles.layoutGrid}>
      {/* Venstre side: Varelisten */}
      <div className={pageStyles.itemsColumn}>
        {cart.items.length === 0 ? (
          <p className={drawerStyles.emptyMessage}>Din kurv er tom</p>
        ) : (
          <div className={drawerStyles.itemsList}>
            {cart.items.map((item) => (
              <CartItem key={item.productId} item={item} />
            ))}
          </div>
        )}
      </div>

      {/* Højre side: Total boksen */}
      {cart.items.length > 0 && (
        <div className={pageStyles.totalsColumn}>
          <CartTotals mode={'checkout'} />
        </div>
      )}
    </div>
  );
}
