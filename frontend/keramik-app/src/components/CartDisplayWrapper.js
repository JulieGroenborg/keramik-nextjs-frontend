'use client';
import dynamic from 'next/dynamic';

export const CartDisplay = dynamic(
  () => import('./CartDrawer'),
  { ssr: false } // <<< important: no server-side rendering
);
