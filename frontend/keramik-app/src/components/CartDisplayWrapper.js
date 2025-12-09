'use client';
import dynamic from 'next/dynamic';

export const CartDisplay = dynamic(
  () => import('./CartPageClient'),
  { ssr: false } // <<< important: no server-side rendering
);
