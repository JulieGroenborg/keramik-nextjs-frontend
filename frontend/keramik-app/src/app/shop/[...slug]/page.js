import AddToBasket from '@/components/AddToBasket';
import { getProductBySlug } from '@/lib/umbraco/api-helpers/getProductBySlug';
import Image from 'next/image';

// The dynamic product page, next injects the URL segments into the params object.
export default async function ProductPage({ params }) {
  const { slug } = await params; // Extract URL segments
  const productSlug = slug.at(-1); // Tager den sidste del af URL arrayets segment, hvilket er produktets slug, eksempelvis "datter-koppen".

  const product = await getProductBySlug(productSlug); //fetch the product data from API using slug.

  if (!product) return <div>Produkt ikke fundet</div>;

  return (
    <main>
      <h1>Produktet</h1>
      <h2>{product.name}</h2>
      <p>{product.properties.description}</p>
      <p>Pris: {product.properties.price} kr</p>
      <Image
        src={`${process.env.NEXT_PUBLIC_UMBRACO_MEDIA_URL}${product.properties.image?.[0]?.url}`}
        alt={product.name}
        width={500}
        height={300}
      />
      <p>
        Tags: {product.properties.material.toLowerCase()},{' '}
        {product.properties.finishing.toLowerCase()}, {product.properties.color.toLowerCase()},{' '}
        {product.properties.size.toLowerCase()}
      </p>

      <p>{product.properties.stockQuantity} på lager</p>
      <AddToBasket />
    </main>
  );
}
