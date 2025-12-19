import { CartDisplay } from '@/components/CartDisplayWrapper';

export default function CartPage() {
  return (
    <main>
      <h1>Din kurv</h1>
      {/* Enten sender man "checkout" eller "drawer" ned som props til checkout-button*/}
      <CartDisplay mode={'checkout'} />
    </main>
  );
}
