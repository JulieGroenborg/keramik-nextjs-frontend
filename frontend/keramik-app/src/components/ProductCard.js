import Link from 'next/link';
import Image from 'next/image';
import AddToBasket from '@/components/AddToBasket';
import styles from '../css/components/ProductCard.module.css'; // Import af CSS modulet

export default function ProductCard({ product }) {
  // Sikrer korrekt billede URL (håndterer hvis billedet mangler)
  const imageUrl = product.properties.image?.[0]?.url
    ? `${process.env.NEXT_PUBLIC_UMBRACO_BASE_URL}${product.properties.image[0].url}`
    : null;

  return (
    <div className={styles.card}>
      <Link href={product.route.path} className={styles.link}>
        {/* Billede container */}
        <div className={styles.imageContainer}>
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={product.name}
              height={346}
              width={276}
              className={styles.productImage}
            />
          ) : (
            <div className={styles.placeholder}>Intet billede</div>
          )}
        </div>

        {/* Tekst */}
        <h2 className={styles.title}>{product.name}</h2>
        <p className={styles.price}>{product.properties.price} DKK</p>
      </Link>

      {/* AddToBasket placeres i bunden */}
      <div className={styles.actions}>
        <AddToBasket product={product} variant="small" />
        <hr className={styles.divider} />
      </div>
    </div>
  );
}
