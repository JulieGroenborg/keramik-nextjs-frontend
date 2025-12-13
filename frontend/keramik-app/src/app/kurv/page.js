import { CartProvider } from '@/lib/context/CartContext';
import { CartDisplay } from '@/components/CartDisplayWrapper';

export default function CartPage() {
  return (
    <CartProvider>
      <main>
        <h1>Din kurv</h1>
        <CartDisplay mode={'checkout'} />
      </main>
    </CartProvider>
  );
}
