import styles from '../css/components/ImageTextCTA.module.css';
import Image from 'next/image';
import Button from './Button';

// regex til at fange statistik rækker, gis flag er for global og case insensitive.
// den fanger h4 (nummer), p (tekst) og img tagget (ikon)
const STATS_REGEX = /<h4>(.*?)<\/h4>\s*<p>(.*?)<\/p>\s*<p><img\s+([^>]+)><\/p>/gis;

function parseStatsFromMarkup(markup) {
  const rows = [];
  let match;

  while ((match = STATS_REGEX.exec(markup)) !== null) {
    const [, number, text, imgAttrs] = match; // de fangede grupper

    // Funktion til at udtrække attributter fra img tag
    const getAttr = (name) => {
      const regex = new RegExp(name + '="([^"]*)"', 'i');
      const match = regex.exec(imgAttrs);
      return match?.[1] ?? '';
    };
    // Tilføj række til array
    rows.push({
      number: number.trim(),
      text: text.trim(),
      icon: {
        src: getAttr('src'),
        alt: getAttr('alt'),
        width: 56,
        height: 40,
      },
    });
  }

  return rows;
}

export default function ImageTextCTA({ content }) {
  const img = content?.image?.[0];
  const cta = content?.cta?.[0];

  const mediaBaseUrl = process.env.NEXT_PUBLIC_UMBRACO_BASE_URL || '';
  const mainImageUrl = img?.url ? `${mediaBaseUrl}${img.url}` : null;

  const href = cta?.route?.path ?? cta?.url ?? '#';

  const markup = content.richTextEditor?.markup || '';
  const stats = parseStatsFromMarkup(markup);

  return (
    <section className={`container ${styles.imageTextCTA}`}>
      <div className={styles.imageTextCTAInner}>
        <div className={styles.imageTextCTAImageWrapper}>
          {mainImageUrl && (
            <Image
              src={mainImageUrl}
              alt={img?.name || content.title || 'Keramik billede'}
              width={img?.width || 488}
              height={img?.height || 557}
              className={styles.imageTextCTAImage}
              loading="eager"
            />
          )}
        </div>

        {/* Højre tekst + stats */}
        <div className={styles.imageTextCTAContent}>
          {content.title && <h2 className={styles.imageTextCTATitle}>{content.title}</h2>}

          {content.subtitle && <p className={styles.imageTextCTASubtitle}>{content.subtitle}</p>}

          {/* Stats fra RTE */}
          {stats.length > 0 && (
            <div className={styles.imageTextCTAStats}>
              {stats.map((stat, i) => {
                const iconSrc = stat.icon.src?.startsWith('/media')
                  ? `${mediaBaseUrl}${stat.icon.src}`
                  : stat.icon.src;

                return (
                  <div key={i} className={styles.statRow}>
                    <div className={styles.statText}>
                      <h4 className={styles.statNumber}>{stat.number}</h4>
                      <p className={styles.statLabel}>{stat.text}</p>
                    </div>

                    <div className={styles.statIcon}>
                      {iconSrc && (
                        <Image
                          src={iconSrc}
                          alt={stat.icon.alt || 'Keramik ikon'}
                          width={stat.icon.width}
                          height={stat.icon.height}
                        />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
          <div className={styles.button}>
            <Button href={href} variant="primary">
              {cta?.title}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
