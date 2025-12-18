import { CartProvider } from '@/lib/context/CartContext';
import { CartDisplay } from '@/components/CartDisplayWrapper';

export default function CartPage() {
  return (
    <CartProvider>
      <main>
        <h1>Din kurv</h1>
        {/* Enten sender man "checkout" eller "drawer" ned som props til checkout-button*/}
        <CartDisplay mode={'checkout'} />
      </main>
    </CartProvider>
  );
}
