'use client';

import styles from '../css/components/Contact.module.css';
import Image from 'next/image';

const MEDIA_BASE_URL = process.env.NEXT_PUBLIC_UMBRACO_URL ?? '';

export default function ContactSection({ data }) {
  const { title, manchet, email, phone, image } = data.properties;

  const relativeUrl = image?.[0]?.url || '';
  const imageUrl = relativeUrl ? `${MEDIA_BASE_URL}${relativeUrl}` : null;
  const imageAlt = image?.[0]?.name || 'Kontakt billede';

  return (
    <section className={styles.contactSection}>
      <div className={styles.inner}>
        {/* 1. Title */}
        <h2 className={styles.heading}>{title}</h2>

        {/* 2. Text */}
        <p className={styles.text}>{manchet}</p>

        {/* 3. Image (Appears here on mobile) */}
        <div className={styles.imageWrapper}>
          {imageUrl && (
            <Image
              src={imageUrl}
              alt={imageAlt}
              fill
              className={styles.image}
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          )}
        </div>

        {/* 4. Contact Info (Appears at bottom on mobile) */}
        <div className={styles.contactInfo}>
          <a href={`mailto:${email}`} className={styles.contactLink}>
            <span className={styles.icon}>✉️</span>
            {email}
          </a>
          <a href={`tel:${phone}`} className={styles.contactLink}>
            <span className={styles.icon}>📞</span>
            {`+45 ${phone}`}
          </a>
        </div>
      </div>
    </section>
  );
}
