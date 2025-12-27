'use client';

import { useState } from 'react';
import Link from 'next/link';
import styles from '../css/components/Navbar.module.css';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import CartDrawer from './CartDrawer';

export default function Navbar() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className={`${styles.navbar} ${isMenuOpen ? styles.open : ''}`}>
      {/* Venstre: Logo */}
      <div className={styles.leftSection}>
        <Link href="/forside">
          <Image src="/sort_logo.webp" alt="Logo" width={93} height={87} className={styles.logo} />
        </Link>
      </div>

      {/* Center: Links (dropdown på mobilversion) */}
      <ul className={`${styles.navLinks} ${isMenuOpen ? styles.open : ''}`}>
        <li>
          <hr className={styles.divider} />

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
