'use client';

import { useState, useEffect } from 'react';
import { CartProvider } from '@/lib/context/CartContext';
import ProductCard from './ProductCard';
import styles from '../css/components/ShopClient.module.css'; // Vi importerer styles

export default function ShopClient({ products }) {
  // Vi starter med 4 for at matche serverens HTML (Mobile first)
  const [visibleCount, setVisibleCount] = useState(4);

  useEffect(() => {
    // Next giver en advarsel, da vi i linje 10 siger at der skal renders 4, men kort efter siger at den skal rende 8 på desktop.
    // For at komme uden om advarslen, så wrapper vi det i et setTimeout.
    // Det flytter opdateringen til "næste tick" i browseren.
    const timer = setTimeout(() => {
      if (window.innerWidth >= 768) {
        setVisibleCount(8);
      }
    }, 0);
    return () => clearTimeout(timer); // oprydning af timer ved unmount
  }, []);

  const handleShowMore = () => {
    const increment = window.innerWidth >= 768 ? 8 : 4;
    setVisibleCount((prev) => prev + increment);
  };

  const visibleProducts = products.slice(0, visibleCount);
  const hasMore = visibleCount < products.length;

  return (
    <CartProvider>
      <div className="container">
        {/* Grid Container */}
        <div className={styles.grid}>
          {visibleProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Vis flere knap */}
        {hasMore && (
          <div className={styles.buttonContainer}>
            <button onClick={handleShowMore} className={styles.loadMoreButton}>
              Vis flere
            </button>
          </div>
        )}
      </div>
    </CartProvider>
  );
}
