'use client';
import Styles from '../css/components/Button.module.css';

export default function Button({ href, children, type, onClick, disabled }) {
  // Hvis der er en href, så opfør dig som et link (<a>)
  if (href) {
    return (
      <a href={href} className={Styles.button}>
        {children}
      </a>
    );
  }

  // Ellers opfør dig som en rigtig knap (<button>), der kan submitte forms
  return (
    <button
      type={type || 'button'} // Bruger 'button' som standard, hvis type mangler
      className={Styles.button}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
