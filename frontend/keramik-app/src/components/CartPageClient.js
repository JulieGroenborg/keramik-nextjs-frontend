// /components/cart/CartDisplayClient.js
'use client';
import { useContext } from 'react';
import { CartContext } from '@/lib/context/CartContext';
import Image from 'next/image';

export default function CartDisplayClient() {
  const { cart, increaseQuantity, decreaseQuantity, removeItem } = useContext(CartContext);

  if (!cart.items.length) {
    return <p>Ingen produkter er valgt</p>;
  }

  // Calculate the total price of all items in the cart by summing (quantity * price) for each item
  const totalPrice = cart.items.reduce((sum, item) => sum + item.quantity * item.price, 0);

  return (
    <div>
      <h2>Din kurv:</h2>
      {cart.items.map((item) => (
        <div key={item.productId}>
          <article>
            <p>Produktnavn: {item.name}</p>
            <Image
              src={`${process.env.NEXT_PUBLIC_UMBRACO_MEDIA_URL}${item.image}`}
              alt={item.name}
              width={200}
              height={100}
            />
            {/* Quantity controls */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <button onClick={() => decreaseQuantity(item.productId)}>-</button>

              <span>{item.quantity}</span>

              <button onClick={() => increaseQuantity(item.productId)}>+</button>
            </div>
            <p>Antal i kurv: x{item.quantity}</p>
            <p>Pris på produktet: {item.price}DKK</p>
            <p>I alt: {item.quantity * item.price}</p>
            {/* Remove */}
            <button onClick={() => removeItem(item.productId)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-trash-fill"
                viewBox="0 0 16 16"
              >
                <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
              </svg>
            </button>
          </article>
        </div>
      ))}
      <p>I alt skal betales: {totalPrice} DKK</p>
      <button>Checkout</button>
    </div>
  );
}
