// /components/cart/CartDisplayClient.js
'use client';
import { useContext } from 'react';
import { CartContext } from '@/lib/context/CartContext';
import Image from 'next/image';

export default function CartDisplayClient() {
  const { cart } = useContext(CartContext);

  if (!cart || cart.items.length === 0) {
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
              width={500}
              height={300}
            />
            <p>Antal i kurv: x{item.quantity}</p>
            <p>Pris på produktet: {item.price}DKK</p>
            <p>I alt: {item.quantity * item.price}</p>
          </article>
        </div>
      ))}
      <p>I alt skal betales: {totalPrice} DKK</p>
      <button>Checkout</button>
    </div>
  );
}
