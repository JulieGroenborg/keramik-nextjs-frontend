import Link from 'next/link';
import Image from 'next/image';
import styles from '../css/components/Footer.module.css';

export default function Footer() {
  const serviceLinks = [
    { title: 'Persondatapolitik', url: '#' },
    { title: 'Handelsbetingelser', url: '#' },
    { title: 'Cookiepolitik', url: '#' },
  ];

  const aboutMeLinks = [
    { title: 'Kontakt mig', url: '/kontakt' },
    { title: 'Om mig', url: '/om-mig' },
  ];

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.brandColumn}>
          <Image src="/hvidt_logo.webp" alt="Logo" width={80} height={50} className={styles.logo} />
          <p className={styles.brandParagraph}>
            Baseret på Earthware Figma-designet, brugt under CC BY 4.0-licensen.
          </p>
          <p className={styles.copyright}>©2025</p>

          <h3 className={styles.socialHeading}>Følg mig</h3>
          <div className={styles.socialIcons}>
            <a href="#" className={styles.iconCircle} aria-label="Instagram">
              <Image src="/instagram.webp" alt="Instagram" width={18} height={18} />
            </a>
          </div>
        </div>

        <div className={styles.middleColumn}>
          <h3 className={styles.heading}>Kundeservice</h3>
          <nav className={styles.linkColumn}>
            {serviceLinks.map((link) => (
              <Link key={link.title} href={link.url} className={styles.link}>
                {link.title}
              </Link>
            ))}
          </nav>
        </div>

        <div className={styles.rightColumn}>
          <h3 className={styles.heading}>Om Mig</h3>
          <nav className={styles.linkColumn}>
            {aboutMeLinks.map((link) => (
              <Link key={link.title} href={link.url} className={styles.link}>
                {link.title}
              </Link>
            ))}
          </nav>

          <p className={styles.infoText}>2740, Skovlunde</p>
          <p className={styles.infoText}>(+45) 26273813</p>
          <p className={styles.infoText}>Julieeriksen09@hotmail.com</p>
        </div>
      </div>
    </footer>
  );
}
