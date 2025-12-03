import styles from '../css/components/HeroSektion.module.css';
import Button from './Button';
import Image from 'next/image';

export default function HeroSektion({ page }) {
  const title = page?.properties?.title.trim();
  const subtitle = page?.properties?.subtitle;
  const buttonText = page?.properties?.heroCTA?.[0]?.title?.trim() || 'Køb nu';

  return (
    <div className={styles.hero}>
      <div className={styles.inner}>
        {title && <h1>{title}</h1>}
        {subtitle && <p className={styles.p}>{subtitle}</p>}
        <Button href="/shop">{buttonText}</Button>
      </div>

      <Image
        src="/desktop_cups.webp"
        alt="Billede af keramik kopper"
        width={600}
        height={400}
        className={styles.cups}
      />
    </div>
  );
}
