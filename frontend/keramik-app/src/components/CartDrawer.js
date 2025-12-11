'use client';
import { useContext } from 'react';
import { CartContext } from '@/lib/context/CartContext';

export default function CartDrawer() {
  const { cart, increase, decrease, removeItem, totalPrice } = useContext(CartContext);

  return (
    <aside className="cart-drawer">
      <h2>Kurv preview</h2>

      {cart.items.length === 0 && <p>Din kurv er tom</p>}

      {cart.items.map((item) => (
        <div key={item.productId} className="drawer-item">
          <p>{item.name}</p>

          <div className="qty-controls">
            <button onClick={() => decrease(item.productId)}>-</button>
            <span>{item.quantity}</span>
            <button onClick={() => increase(item.productId)}>+</button>
          </div>

          <p>{item.price} DKK</p>

          <button onClick={() => removeItem(item.productId)}>Fjern</button>
        </div>
      ))}

      <hr />

      <p>
        <strong>Total:</strong> {totalPrice} DKK
      </p>
    </aside>
  );
}
