import styles from '../css/components/KvaliteterOgVaerdier.module.css';
import Image from 'next/image';

export default function KvaliteterOgVaerdier({ content }) {
  if (!content) return null;

  const title = content.title?.trim();
  const values = content.list?.items ?? [];

  // Bygger media-base-url ud fra din Umbraco API-url
  const mediaBaseUrl = process.env.NEXT_PUBLIC_UMBRACO_BASE_URL || '';

  return (
    <section className={`container ${styles.section}`}>
      {title && <h2 className={styles.title}>{title}</h2>}

      <div className={styles.grid}>
        {values.map((item) => {
          const valueBlock = item.content;
          if (!valueBlock) return null;

          const { id, properties } = valueBlock;
          const icon = properties.icon?.[0];
          const imageUrl = icon?.url ? `${mediaBaseUrl}${icon.url}` : null;

          return (
            <article key={id} className={styles.card}>
              {imageUrl && (
                <div className={styles.iconWrapper}>
                  <Image
                    src={imageUrl}
                    alt={icon?.name || properties.title || ''}
                    className={styles.icon}
                    loading="lazy"
                    height={24}
                    width={32}
                  />
                </div>
              )}

              <div className={styles.textWrapper}>
                <h3 className={styles.cardTitle}>{properties.title?.trim()}</h3>
                <p className={styles.description}>{properties.description}</p>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
