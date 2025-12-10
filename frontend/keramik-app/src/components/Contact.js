import styles from '../css/components/Contact.module.css';
import Image from 'next/image';

const MEDIA_BASE_URL = process.env.NEXT_PUBLIC_UMBRACO_MEDIA_URL ?? '';

export default function ContactSection({ data }) {
  const { title, manchet, email, phone, image } = data.properties;

  const relativeUrl = image?.[0]?.url || '';
  const imageUrl = relativeUrl ? `${MEDIA_BASE_URL}${relativeUrl}` : null;
  const imageAlt = image?.[0]?.name || 'Kontakt billede';

  return (
    <section className={styles.contactSection}>
      <div className={styles.inner}>
        {/* 1. Titel */}
        <h2 className={styles.heading}>{title}</h2>

        {/* 2. Tekst */}
        <p className={styles.text}>{manchet}</p>

        {/* 3. Billede */}
        <div className={styles.imageWrapper}>
          {imageUrl && (
            <Image
              src={imageUrl}
              alt={imageAlt}
              fill
              className={styles.image}
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          )}
        </div>

        {/* Kontakt info */}
        <div className={styles.contactInfo}>
          {/* Skal være a tags til mail og telefon */}
          <a href={`mailto:${email}`} className={styles.contactLink}>
            <div className={styles.iconWrapper}>
              <Image src="/Email.png" alt="Email" width={20} height={30} />
            </div>
            {email}
          </a>
          <a href={`tel:${phone}`} className={styles.contactLink}>
            <div className={styles.iconWrapper}>
              <Image src="/Phone.png" alt="Phone" width={20} height={30} />
            </div>
            {`+45 ${phone}`}
          </a>
        </div>
      </div>
    </section>
  );
}
