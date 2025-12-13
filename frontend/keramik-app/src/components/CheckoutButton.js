import { useContext } from 'react';
import { CartContext } from '../lib/context/CartContext';

export default function CheckoutButton(props) {
  const { cart } = useContext(CartContext);

  const handleClick = async () => {
    if (props.mode === 'drawer') {
      // Simple navigation to cart page
      window.location.href = '/kurv';
      return;
    }
    console.log('sender disse items til backend:', cart.items);
    // mode is not == "drawer" → call backend and redirect to Stripe
    const response = await fetch('http://localhost:51857/stripe-api/create-checkout-session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(
        cart.items.map((item) => {
          const payload = {
            name: item.name,
            price: item.price,
            quantity: item.quantity,
          };
          if (item.description) {
            payload.description = item.description; // Only add if not empty
          }
          return payload;
        })
      ),
    });

    const data = await response.json();
    console.log('dette er data.url', data.url);
    window.location.href = data.url; // Redirects user to Stripe
  };

  return (
    <button onClick={handleClick} disabled={cart.items.length === 0}>
      {props.mode === 'drawer' ? 'Gå til kurv' : 'Gå til betaling'}
    </button>
  );
}
