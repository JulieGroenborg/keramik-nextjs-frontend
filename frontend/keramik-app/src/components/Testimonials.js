'use client';

import styles from '../css/components/Testimonials.module.css';
import { useState } from 'react';
import Image from 'next/image';

const MEDIA_BASE_URL = process.env.NEXT_PUBLIC_UMBRACO_MEDIA_URL ?? '';

export default function TestimonialsSection({ title, testimonials }) {
  // Mapper Umbraco-data om til et simpelt objekt
  const mapped = testimonials.map((item) => {
    const p = item.content.properties; // Genvej til properties
    const relativeUrl = p.image?.[0]?.url || ''; // Hvis der er billede, brug det
    const avatar = relativeUrl ? `${MEDIA_BASE_URL}${relativeUrl}` : null; // Saml fuld URL

    return {
      id: item.content.id,
      name: p.title, // Navn på personen
      location: p.subtitle, // By/placering
      text: p.text, // Selve testimonial-teksten
      avatar, // Billede
      bg: p.backgroundColor?.color ? `#${p.backgroundColor.color}` : '#fff', // Baggrundsfarve, #fff er fallback
    };
  });

  const total = mapped.length; // Hvor mange testimonials der er i alt, så vi kan tilføje flere og de stadig bliver vist

  const [index, setIndex] = useState(0);
  // Hvilket testimonial der er i midten

  const [direction, setDirection] = useState(0);
  // Hvilken retning animationen går (0=ingen, 1=højre, -1=venstre)

  const [animating, setAnimating] = useState(false);
  // Bruges til at forhindre man klikker for hurtigt

  // Beregn tidligere og næste index så vi altid viser 3 kort (bruges så vi can cutte dem af)
  const prevIndex = (index - 1 + total) % total;
  const nextIndex = (index + 1) % total;

  // 3 synlige kort (venstre, midten, højre)
  const visible = [mapped[prevIndex], mapped[index], mapped[nextIndex]];

  // sætter kun state og starter animationen, animationen håndteres i CSS
  function handleNext() {
    if (animating) return; // Stop hvis animation stadig kører
    setDirection(1); // Sæt retning til "næste"
    setAnimating(true); // Lås knapperne

    setTimeout(() => {
      setIndex((i) => (i + 1) % total); // Gå ét frem
      setAnimating(false); // Lås op igen
      setDirection(0); // Nulstil retning (snap tilbage)
    }, 300); // Matcher CSS-animationen
  }

  function handlePrev() {
    if (animating) return; // Stop hvis animation stadig kører
    setDirection(-1); // Sæt retning til "forrige"
    setAnimating(true); // Lås knapperne

    setTimeout(() => {
      setIndex((i) => (i - 1 + total) % total); // Gå ét tilbage
      setAnimating(false); // Lås op igen
      setDirection(0); // Reset
    }, 300); // Matcher CSS-animation
  }

  return (
    <section className={styles.testimonials}>
      {/* ydre container */}
      <div className={styles.inner}>
        {/* Overskrift */}
        <h2 className={styles.heading}>{title}</h2>

        {/* wrapper der holder track og knapper */}
        <div className={styles.cardWrapper}>
          {/* Track der flytter sig når man swiper */}
          <div
            className={`${styles.track} ${
              direction === 1 ? styles.slideNext : direction === -1 ? styles.slidePrev : ''
            }`}
          >
            {/* Vis de 3 kort */}
            {visible.map((item, i) => (
              <article
                key={`${item.id}-${i}`}
                className={styles.card}
                style={{ backgroundColor: item.bg }}
              >
                {/* Citat-ikon */}
                <Image
                  src="/quote.webp"
                  alt=""
                  width={16}
                  height={16}
                  className={styles.quoteIcon}
                />

                {/* Indholdet af kortet */}
                <div className={styles.cardContent}>
                  {/* Venstre kolonne (avatar + navn) */}
                  <div className={styles.left}>
                    <div className={styles.avatarWrapper}>
                      {item.avatar && (
                        <Image
                          src={item.avatar}
                          alt={item.name}
                          fill // Bruger fill pga. wrapperen
                          className={styles.avatar}
                        />
                      )}
                    </div>

                    {/* Navn + location */}
                    <div className={styles.person}>
                      <p className={styles.name}>{item.name}</p>
                      <p className={styles.location}>{item.location}</p>
                    </div>
                  </div>

                  {/* dashed linje der adskiller content */}
                  <div className={styles.divider} />

                  {/* Selve teksten */}
                  <p className={styles.text}>{item.text}</p>
                </div>
              </article>
            ))}
          </div>

          {/* venstre knap */}
          <button
            type="button"
            className={`${styles.arrowButton} ${styles.prev}`}
            onClick={handleNext}
          >
            <Image src="/Arrow-left.svg" alt="Previous" width={10} height={10} />
          </button>

          {/* højre knap */}
          <button
            type="button"
            className={`${styles.arrowButton} ${styles.next}`}
            onClick={handlePrev}
          >
            <Image src="/Arrow-right.svg" alt="Next" width={10} height={10} />
          </button>
        </div>
      </div>
    </section>
  );
}
