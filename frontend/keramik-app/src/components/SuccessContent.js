'use client';

import { useEffect, useState, useContext } from 'react';
import { useSearchParams } from 'next/navigation';
import { CartContext } from '@/lib/context/CartContext';

export default function SuccessContent() {
  // --- Tilstandshåndtering og URL-parametre ---
  // Vi henter sessionId fra URL'en og gør klar til at opdatere kurven og sidens status.
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const { setCart } = useContext(CartContext);

  const [status, setStatus] = useState('loading');

  // --- Ordre-verificering mod backenden ---
  // Denne effekt kører ved indlæsning og spørger vores C# API om ordrens endelige status.
  useEffect(() => {
    if (!sessionId) return;

    const verifyOrder = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_UMBRACO_BASE_URL}/stripe-api/verify-session?sessionId=${sessionId}`
        );

        if (!res.ok) throw new Error('Kunne ikke verificere ordren');

        const data = await res.json();

        // Håndtering af de tre primære scenarier: Succes, Refundering (oversalg) eller Afventer.
        if (data.status === 'success') {
          setStatus('success');
          setCart({ items: [] });
        } else if (data.status === 'refunded') {
          setStatus('refunded');
          setCart({ items: [] });
        } else {
          setStatus('pending');
        }
      } catch (err) {
        console.error('Verification error:', err);
        setStatus('error');
      }
    };

    // Timeout sikrer, at Webhook'en har tid til at færdiggøre lager-tjek og refundering før vi spørger.
    const timer = setTimeout(verifyOrder, 2500);
    return () => clearTimeout(timer);
  }, [sessionId, setCart]);

  // --- Visning for fejlende eller manglende data ---
  if (!sessionId) {
    // Hvis brugeren ikke har et sessionId, sender vi dem til shoppen
    window.location.href = '/shop';
    return null;
  }

  // --- Visning under indlæsning (Loading state) ---
  if (status === 'loading' || status === 'pending') {
    return (
      <section>
        <h1>Verificerer din bestilling...</h1>
        <p>Vi sikrer os lige, at alt er på lager. Vent venligst et øjeblik.</p>
      </section>
    );
  }

  // --- Visning ved oversalg (Refunded state) ---
  if (status === 'refunded') {
    return (
      <section>
        <h1>Beklager! Varen er desværre udsolgt 😔</h1>
        <p>En anden kunde nåede at købe den sidste vare lige før dig.</p>
        <p>
          <strong>Pengene er refunderet:</strong> da vi ikke kan levere varen, er beløbet sendt
          retur til dit kort.
        </p>
      </section>
    );
  }

  // --- Visning ved tekniske fejl ---
  if (status === 'error') {
    return (
      <section>
        <h1>Der skete en fejl</h1>
        <p>
          Vi kunne ikke bekræfte din ordrestatus automatisk. Tjek venligst din email for
          bekræftelse.
        </p>
      </section>
    );
  }

  // --- Visning ved gennemført køb (Success state) ---
  return (
    <section>
      <h1>Tak for din bestilling 🎉</h1>
      <p>Vi har modtaget din betaling. En bekræftelse er sendt til din mail.</p>
      <p>Vi går i gang med at pakke din ordre med det samme!</p>
    </section>
  );
}
