import { CartProvider } from '@/lib/context/CartContext';
import { getProductBySlug } from '@/lib/shop/api-helpers/getProductBySlug';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import ProductActions from '@/components/ProductActions';

export default async function ProductPage({ params }) {
  const { slug } = await params;

  if (slug.length === 1) {
    redirect('/shop');
  }

  const productSlug = slug.at(-1);
  const product = await getProductBySlug(productSlug);
  if (!product) return <div>Produkt ikke fundet</div>;

  return (
    <main>
      <h1>{product.name}</h1>
      <p>{product.properties.description}</p>
      <p>Pris: {product.properties.price} kr</p>
      <Image
        src={`${process.env.NEXT_PUBLIC_UMBRACO_MEDIA_URL}${product.properties.image?.[0]?.url}`}
        alt={product.name}
        width={500}
        height={300}
      />
      <CartProvider>
        <ProductActions product={product} />
      </CartProvider>
    </main>
  );
}
