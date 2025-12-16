'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');

  const [paymentInfo, setPaymentInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!sessionId) return;

    fetch(`http://localhost:51857/stripe-api/verify-session?sessionId=${sessionId}`)
      .then((res) => {
        if (!res.ok) throw new Error('Payment not completed');
        return res.json();
      })
      .then((data) => {
        setPaymentInfo(data);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [sessionId]);

  if (!sessionId) return <p>Session ID missing</p>;
  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Tak for din bestilling 🎉</h1>
      <p>Tjek venligst din email</p>
    </div>
  );
}
