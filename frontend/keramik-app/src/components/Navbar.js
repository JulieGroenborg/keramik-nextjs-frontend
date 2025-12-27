'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import styles from '../css/components/Navbar.module.css';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import CartDrawer from './CartDrawer';

export default function Navbar() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Funktion til at beregne antal
  // useCallback bruges for at undgå unødvendige re-renders ved at den husker funktionen
  const updateCartCount = useCallback(() => {
    if (typeof window !== 'undefined') {
      const storedCart = localStorage.getItem('cart');
      if (storedCart) {
        try {
          const parsedCart = JSON.parse(storedCart);
          const count = parsedCart.items.reduce((total, item) => total + item.quantity, 0);
          setCartCount(count);
        } catch (error) {
          console.error('Fejl ved parsing af kurv:', error);
          setCartCount(0);
        }
      } else {
        setCartCount(0);
      }
    }
  }, []); // Tomt array betyder, at funktionen aldrig ændrer sig

  useEffect(() => {
    // Vi bruger setTimeout til at skubbe opdateringen til næste "event loop"
    // Dette fjerner fejlen, fordi React får lov at tegne færdig først.
    setTimeout(() => {
      updateCartCount();
    }, 0);

    // Lytter efter ændringer i localStorage (f.eks. fra tilføjelse eller fjernelse af varer)
    window.addEventListener('cart-updated', updateCartCount);
    window.addEventListener('storage', updateCartCount); // Opdaterer hvis man har flere faner åbne

    return () => {
      window.removeEventListener('cart-updated', updateCartCount);
      window.removeEventListener('storage', updateCartCount);
    };
  }, []);

  return (
    <nav className={`${styles.navbar} ${isMenuOpen ? styles.open : ''}`}>
      {/* Venstre: Logo */}
      <div className={styles.leftSection}>
        <Link href="/forside">
          <Image src="/sort_logo.webp" alt="Logo" width={93} height={87} className={styles.logo} />
        </Link>
      </div>

      {/* Center: Links */}
      <ul className={`${styles.navLinks} ${isMenuOpen ? styles.open : ''}`}>
        <li>
          <Link
            href="/forside"
            className={pathname === '/forside' ? styles.active : styles.link}
            onClick={() => setIsMenuOpen(false)}
          >
            Hjem
          </Link>
        </li>
        <li>
          <Link
            href="/shop"
            className={pathname === '/shop' ? styles.active : styles.link}
            onClick={() => setIsMenuOpen(false)}
          >
            <hr className={styles.divider} />
            Shop
          </Link>
        </li>
        <li>
          <Link
            href="/om-mig"
            className={pathname === '/om-mig' ? styles.active : styles.link}
            onClick={() => setIsMenuOpen(false)}
          >
            <hr className={styles.divider} />
            Om
          </Link>
        </li>
        <li>
          <Link
            href="/kontakt"
            className={pathname === '/kontakt' ? styles.active : styles.link}
            onClick={() => setIsMenuOpen(false)}
          >
            <hr className={styles.divider} />
            Kontakt
          </Link>
        </li>
      </ul>

      {/* Højre: Kurvens sektion */}
      <div className={styles.rightSection}>
        {/* Kurv ikon */}
        <div className={styles.cart} style={{ position: 'relative' }}>
          <button
            className={styles.icon}
            onClick={() => setIsOpen(!isOpen)}
            style={{ visibility: isOpen ? 'hidden' : 'visible' }}
          >
            🛒
            {/* Badget */}
            {cartCount > 0 && <span className={styles.badge}>{cartCount}</span>}
          </button>

          {isOpen && <CartDrawer mode={'drawer'} onClose={() => setIsOpen(false)} />}
        </div>

        {/* Hamburger knap */}
        <button
          className={`${styles.hamburger} ${isMenuOpen ? styles.active : ''}`}
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <span className={styles.bar} />
          <span className={styles.bar} />
          <span className={styles.bar} />
        </button>
      </div>
    </nav>
  );
}
