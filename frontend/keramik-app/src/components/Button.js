'use client';

import styles from '../css/components/Button.module.css';

export default function Button({ href, children }) {
  return (
    <a href={href} className={styles.button}>
      {children}
    </a>
  );
}
