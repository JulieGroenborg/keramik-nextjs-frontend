'use client';
import dynamic from 'next/dynamic';
import styles from '../../css/components/CartPage.module.css'; // Import af den nye CSS
import Banner from '@/components/Banner';

const CartView = dynamic(() => import('@/components/CartView'), {
  ssr: false,
  loading: () => <p style={{ textAlign: 'center', padding: '50px' }}>Indlæser kurv...</p>,
});

export default function CartPage() {
  return (
    <main>
      <div className={styles.headerBanner}>
        <Banner title="Din kurv" />
      </div>

      {/* CartView håndterer grid/listen */}
      <div className={styles.pageContainer}>
        <CartView />
      </div>
    </main>
  );
}
