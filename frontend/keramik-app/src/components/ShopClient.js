'use client';

import { CartProvider } from '@/lib/context/CartContext';
import AddToBasket from '@/components/AddToBasket';
import Link from 'next/link';

export default function ShopClient({ products }) {
  return (
    <CartProvider>
      {products.map((product) => (
        <div key={product.id}>
          <Link href={product.route.path}>
            <h2>{product.name}</h2>
            <p>{product.properties.price} kr.</p>
          </Link>
          <AddToBasket product={product} />
        </div>
      ))}
    </CartProvider>
  );
}
