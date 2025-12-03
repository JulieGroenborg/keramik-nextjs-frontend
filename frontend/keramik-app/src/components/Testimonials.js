'use client';

import styles from '../css/components/Testimonials.module.css';
import { useState } from 'react';
import Image from 'next/image';

export default function TestimonialsSection({ title, testimonials }) {
  // Raw items from Umbraco (frontpageComponents.items[0].content.properties.list.items)
  const items = testimonials ?? [];

  // Map Umbraco format → clean UI format
  const mapped = items.map((item) => {
    const p = item?.content?.properties;

    return {
      id: item?.content?.id,
      name: p?.title ?? '',
      location: p?.subtitle ?? '',
      text: p?.text ?? '',
      avatar: p?.image?.[0]?.url ?? '',
      bg: p?.backgroundColor?.color ? `#${p.backgroundColor.color}` : 'var(--primary-200)', // fallback if no color
    };
  });

  // Hooks must always run – never after a conditional return
  const [index, setIndex] = useState(0);

  // If no testimonials, render nothing
  if (mapped.length === 0) {
    return null;
  }

  // Make sure index is always in range, even if data changes
  const safeIndex = index % mapped.length;
  const current = mapped[safeIndex];

  function handleNext() {
    setIndex((i) => (i + 1) % mapped.length);
  }

  function handlePrev() {
    setIndex((i) => (i - 1 + mapped.length) % mapped.length);
  }

  return (
    <section className={styles.testimonials}>
      <div className={styles.inner}>
        <h2 className={styles.heading}>{title ?? 'Kunder mener'}</h2>

        <div className={styles.cardWrapper}>
          <article className={styles.card} style={{ backgroundColor: current.bg }}>
            <span className={styles.quoteIcon}>“</span>

            <div className={styles.cardContent}>
              <div className={styles.left}>
                <div className={styles.avatarWrapper}>
                  <Image
                    src={current.avatar}
                    alt={current.name}
                    width={64}
                    height={64}
                    className={styles.avatar}
                  />
                </div>

                <div className={styles.person}>
                  <p className={styles.name}>{current.name}</p>
                  <p className={styles.location}>{current.location}</p>
                </div>
              </div>

              <div className={styles.divider} aria-hidden="true" />

              <p className={styles.text}>{current.text}</p>
            </div>

            <button
              type="button"
              className={`${styles.navButton} ${styles.prev}`}
              onClick={handlePrev}
              aria-label="Forrige testimonial"
            >
              ←
            </button>

            <button
              type="button"
              className={`${styles.navButton} ${styles.next}`}
              onClick={handleNext}
              aria-label="Næste testimonial"
            >
              →
            </button>
          </article>
        </div>
      </div>
    </section>
  );
}
