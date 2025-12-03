import styles from '../css/components/OmMig.module.css';
import Image from 'next/image';

export default function OmMig({ content }) {
  const title = content?.title?.trim();
  const values = content?.list?.items ?? []; // array af value blokke

  return (
    <section className={`container ${styles.background}`}>
      {title && <h2 className={styles.sectionTitle}>{title}</h2>}

      <div className={styles.valuesWrapper}>
        {values.map((item) => {
          const valueBlock = item.content;
          const props = valueBlock.properties;
          const icon = props.icon?.[0]; // ikonet for hver value
          const mediaBaseUrl = process.env.NEXT_PUBLIC_UMBRACO_MEDIA_URL || '';
          const imageUrl = icon?.url ? `${mediaBaseUrl}${icon.url}` : null;

          return (
            <div key={valueBlock.id} className={styles.valueCard}>
              {imageUrl && (
                <Image
                  src={imageUrl}
                  alt={icon.name || props.title}
                  width={96}
                  height={96}
                  className={styles.icon}
                />
              )}

              <h3 className={styles.valueTitle}>{props.title}</h3>
              <p className={styles.valueDescription}>{props.description}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
