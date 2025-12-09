import { CartProvider } from '@/lib/context/CartContext'; // Wraps components that needs access to the global cart state.
import { getProductBySlug } from '@/lib/shop/api-helpers/getProductBySlug';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import ProductActions from '@/components/ProductActions'; //component containing the quantity selector/dropdown and AddToBasket

export default async function ProductPage({ params }) {
  const { slug } = await params; // Extracts the slug array from params. Slug will be something like ['kopper', 'datter-koppen']

  // Håndterer hvis en bruger besøger kategory:
  if (slug.length === 1) {
    redirect('/shop');
  }

  const productSlug = slug.at(-1); // Tager den sidste del af URL'en, altså produktet.

  const product = await getProductBySlug(productSlug); // Fetches produktet fra vores API by slug.

  if (!product) return <div>Produkt ikke fundet</div>;

  return (
    <main>
      <h2>{product.name}</h2>
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
