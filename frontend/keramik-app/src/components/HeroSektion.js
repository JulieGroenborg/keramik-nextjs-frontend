import styles from '../css/components/HeroSektion.module.css';

export default function HeroSektion({ page }) {
  const title = page?.properties?.title.trim();
  const subtitle = page?.properties?.subtitle;

  return (
    <div className={styles.hero}>
      <div className="container">
        {title && <h1>{title}</h1>}

        {subtitle && <p className={styles.p}>{subtitle}</p>}
      </div>
    </div>
  );
}
