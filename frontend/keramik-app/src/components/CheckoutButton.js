import { useContext } from 'react';
import { CartContext } from '../lib/context/CartContext';

export default function CheckoutButton(props) {
  const { cart } = useContext(CartContext);

  // Handles button click for both "go to cart" and "go to payment"
  const handleClick = async () => {
    if (props.mode === 'drawer') {
      // Hvis props er = "drawer", så vil knappen blot dirigere brugeren til kurv
      window.location.href = '/kurv';
      return;
    }

    // Og ellers, vil knappen blive brug til checkout: send cart data til backenden og create a Stripe Checkout session
    const response = await fetch('http://localhost:51857/stripe-api/create-checkout-session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      // Send kun de data, som backenden har brug for (aldrig stol på frontend prices)
      body: JSON.stringify(
        cart.items.map((item) => {
          const payload = {
            name: item.name,
            price: item.price,
            quantity: item.quantity,
          };
          // Kun inkluder description hvis den eksisterer, for at undgå Stripe erros grundet tomme strings
          if (item.description) {
            payload.description = item.description;
          }
          return payload;
        })
      ),
    });
    // Parse responset fra backenden
    const data = await response.json();

    // Redirect brugeren til Stripes hosted checkout page
    window.location.href = data.url;
  };

  return (
    <button onClick={handleClick} disabled={cart.items.length === 0}>
      {props.mode === 'drawer' ? 'Gå til kurv' : 'Gå til betaling'}
    </button>
  );
}
