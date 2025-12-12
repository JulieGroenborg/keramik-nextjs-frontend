import { getProductBySlug } from '@/lib/shop/api-helpers/getProductBySlug';
import { redirect } from 'next/navigation';
import Product from '@/components/Product';

export default async function ProductPage({ params }) {
  const { slug } = await params; // Extracts the slug array from params. Slug will be something like ['kopper', 'datter-koppen']

  // Håndterer hvis en bruger besøger kategory:
  if (slug.length === 1) {
    redirect('/shop');
  }

  const productSlug = slug.at(-1); // Tager den sidste del af URL'en, altså produktet.

  const product = await getProductBySlug(productSlug); // Fetches produktet fra vores API by slug.

  if (!product) return <div>Produkt ikke fundet</div>;

  return <Product product={product} />;
}
