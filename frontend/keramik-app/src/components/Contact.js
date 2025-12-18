import styles from '../css/components/Contact.module.css';
import Image from 'next/image';

const MEDIA_BASE_URL = process.env.NEXT_PUBLIC_UMBRACO_MEDIA_URL ?? '';

const PARAGRAPH_REGEX = /<p>(.*?)<\/p>/gis;

function parseParagraphsFromMarkup(markup) {
  const rows = [];
  let match;

  while ((match = PARAGRAPH_REGEX.exec(markup)) !== null) {
    rows.push(
      match[1]
        .replace(/<br\s*\/?>/gi, '\n')
        .replace(/<[^>]+>/g, '')
        .trim()
    );
  }

  return rows;
}

export default function ContactSection({ data }) {
  const content = data?.properties ?? data;

  if (!content) return null;

  const img = content.image?.[0];
  const imageUrl = img?.url ? `${MEDIA_BASE_URL}${img.url}` : null;

  const markup = content.manchet?.markup || '';
  const paragraphs = parseParagraphsFromMarkup(markup);

  return (
    <section className={styles.contactSection}>
      <div className={styles.inner}>
        {content.title && <h2 className={styles.heading}>{content.title}</h2>}

        {paragraphs.length > 0 && (
          <div className={styles.text}>
            {paragraphs.map((text, i) => (
              <p key={i}>{text}</p>
            ))}
          </div>
        )}

        {imageUrl && (
          <div className={styles.imageWrapper}>
            <Image
              src={imageUrl}
              alt={img?.name || content.title || 'Kontakt billede'}
              fill
              className={styles.image}
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          </div>
        )}

        <div className={styles.contactInfo}>
          {content.email && (
            <a href={`mailto:${content.email}`} className={styles.contactLink}>
              {content.email}
            </a>
          )}

          {content.phone && (
            <a href={`tel:${content.phone}`} className={styles.contactLink}>
              {`+45 ${content.phone}`}
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
