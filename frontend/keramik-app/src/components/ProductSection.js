import ProductCard from './ProductCard';
import styles from '../css/components/ProductSection.module.css';
import Button from './Button';

export default function ProductSection({ title, products, variant, buttonText, buttonLink }) {
  if (!products || products.length === 0) return null;

  const containerClass = `${styles.section} ${styles[variant]}`;

  return (
    <section className={containerClass}>
      <div className={`container ${styles.container}`}>
        <div className={styles.header}>
          {title && <h2 className={styles.title}>{title}</h2>}

          {buttonText && buttonLink && (
            <div className={styles.buttonWrapper}>
              {/* Vi sender href og children ind i din komponent */}
              <Button href={buttonLink} className={styles.button}>
                {buttonText}
              </Button>
            </div>
          )}
        </div>

        <div className={styles.grid}>
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
