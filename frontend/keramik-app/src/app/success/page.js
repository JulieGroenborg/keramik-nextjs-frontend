'use client';

import { Suspense } from 'react';
import SuccessContent from '@/components/SuccessContent';

export default function SuccessPage() {
  return (
    /* Suspense boundary er nødvendig her, fordi SuccessContent bruger useSearchParams().
       Det fortæller Next.js, at denne del af siden først kan renderes færdig på klienten.
    */
    <Suspense fallback={<p>Vent venligst...</p>}>
      <SuccessContent />
    </Suspense>
  );
}
