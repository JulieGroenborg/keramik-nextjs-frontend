'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

export default function SuccessPage() {
  // Læs query parameter fra URL. Stripe redirects tilbge med ?session_id=...
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');

  const [paymentInfo, setPaymentInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Kører når pagen loader eller når sessionId ændres
  useEffect(() => {
    if (!sessionId) return; // If Stripe ikke returnerer et session_id, så kan vi ikke verify noget

    // Kald backenden for at verify at Stripe Payment er completed
    fetch(
      `https://jgebackend-h3bdb9g0hraufsgv.swedencentral-01.azurewebsites.net/stripe-api/verify-session?sessionId=${sessionId}`
    )
      .then((res) => {
        // If backend responderer med noget andet end 200 ok, behandler vi the payment som ikke completed
        if (!res.ok) throw new Error('Payment not completed');
      })
      .then((data) => {
        // Optional: store returned data (currently unused)
        setPaymentInfo(data);
      })
      .catch((err) => setError(err.message)) // Store error message to show feedback to the user
      .finally(() => setLoading(false));
  }, [sessionId]);

  // If Stripe redirect ikke include a session ID
  if (!sessionId) return <p>Session ID missing</p>;

  // Imens man venter på backend verification
  if (loading) return <p>Loading...</p>;

  // If payment verfication fejler
  if (error) return <p>{error}</p>;

  // Payment verified successfully
  return (
    <div>
      <h1>Tak for din bestilling 🎉</h1>
      <p>Tjek venligst din email</p>
    </div>
  );
}
