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
      <h1>{product.name}</h1>
      <p>{product.properties.description}</p>
      <p>Pris: {product.properties.price} kr</p>
      <Image></Image>
    </main>
  );
}
