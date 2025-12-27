import { useContext, useState } from 'react';
import { CartContext } from '../lib/context/CartContext';
import styles from '../css/components/CheckoutButton.module.css';

export default function CheckoutButton(props) {
  const { cart } = useContext(CartContext);
  const [loading, setLoading] = useState(false);

  // Handles button click for both "go to cart" and "go to payment"
  const handleClick = async () => {
    if (props.mode === 'drawer') {
      // Hvis props er = "drawer", så vil knappen blot dirigere brugeren til kurv
      window.location.href = '/kurv';
      return;
    }

    setLoading(true);

    // Og ellers, vil knappen blive brug til checkout: send cart data til backenden og create a Stripe Checkout session
    try {
      const response = await fetch('http://localhost:51857/stripe-api/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // Send kun de data, som backenden har brug for (aldrig stol på frontend prices)
        body: JSON.stringify(
          cart.items.map((item) => ({
            id: item.productId,
            quantity: item.quantity,
          }))
        ),
      });
      const data = await response.json();

      if (response.ok) {
        // Alt er OK (Lager findes) -> Send kunden til Stripe
        window.location.href = data.url;
      } else {
        // Backend sendte en fejl (f.eks. status 400 - Ikke nok på lager)
        alert(data.error || 'Der opstod en fejl ved checkout');
        setLoading(false);
      }
    } catch (err) {
      console.error('Netværksfejl:', err);
      alert('Kunne ikke få forbindelse til serveren.');
      setLoading(false);
    }
  };

  return (
    <button
      // Her vælger vi klasse baseret på 'mode'
      className={`${styles.actionButton} ${props.mode === 'drawer' ? styles.btnDrawer : styles.btnCheckout}`}
      onClick={handleClick}
      disabled={cart.items.length === 0 || loading}
    >
      {loading ? 'Vent venligst...' : props.mode === 'drawer' ? 'Gå til kurv' : 'Gå til betaling'}
    </button>
  );
}
