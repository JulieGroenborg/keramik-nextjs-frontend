import styles from '../css/components/HeroSektion.module.css';

export default function HeroSektion({ page }) {
  const title = page?.properties?.title.trim();

  return (
    <div className={styles.hero}>
      <div className="container">
        {title && <h1>{title}</h1>}

        {/* subtitle*/}

        {/* import reuseable knap */}
      </div>
    </div>
  );
}
