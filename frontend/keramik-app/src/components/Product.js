import { CartProvider } from '@/lib/context/CartContext';
import ProductActions from '@/components/ProductActions';
import Image from 'next/image';
import styles from '../css/components/Product.module.css';
import RelatedProducts from './RelatedProducts';

const MEDIA_BASE_URL = process.env.NEXT_PUBLIC_UMBRACO_MEDIA_URL ?? '';

export default function ProductContent({ product, allProducts }) {
  const relativeUrl = product.properties.image?.[0]?.url;
  const imageUrl = relativeUrl ? `${MEDIA_BASE_URL}${relativeUrl}` : null;
  const imageAlt = product.properties.image?.[0]?.name || product.name;

  return (
    <section className={styles.productSection}>
      <div className={styles.inner}>
        <div className={styles.imageColumn}>
          <div className={styles.imageCard}>
            {imageUrl && (
              <Image
                src={imageUrl}
                alt={imageAlt}
                width={500}
                height={500}
                className={styles.productImage}
                priority
              />
            )}
          </div>
        </div>

        <div className={styles.detailsColumn}>
          <h1 className={styles.title}>{product.name}</h1>

          <div className={styles.description}>
            <p>{product.properties.description}</p>
          </div>

          <p className={styles.tags}>
            <span className={styles.tagLabel}>Tags: </span>
            {product.properties.material}, {product.properties.finishing},{' '}
            {product.properties.color}, {product.properties.size}
          </p>

          <div className={styles.bottomSection}>
            <div className={styles.priceWrapper}>
              <span className={styles.priceLabel}>Pris </span>
              <span className={styles.priceValue}>{product.properties.price} DKK</span>
            </div>

            <CartProvider>
              <ProductActions product={product} />
            </CartProvider>
          </div>
        </div>
      </div>

      <div className={styles.relatedHeaderWrapper}>
        <h2 className={styles.relatedHeader}>Lignende Produkter</h2>
        <hr className={styles.divider} />
        <RelatedProducts currentProduct={product} productsList={allProducts} />
      </div>
    </section>
  );
}
