import { getProductBySlug } from '@/lib/shop/api-helpers/getProductBySlug';
import { redirect } from 'next/navigation';
import Product from '@/components/Product';
import { getShop } from '@/lib/shop/api-helpers/getShop';
import Banner from '@/components/Banner';

export default async function ProductPage({ params }) {
  const { slug } = await params; // Extracts the slug array from params. Slug will be something like ['kopper', 'datter-koppen']

  // Håndterer hvis en bruger besøger kategory:
  if (slug.length === 1) {
    redirect('/shop');
  }

  const productSlug = slug.at(-1); // Tager den sidste del af URL'en, altså produktet.

  // promise.all kører begge asynkrone funktioner parallelt og venter på at begge er færdige.
  const [product, shopData] = await Promise.all([
    getProductBySlug(productSlug), // Henter det specifikke produkt baseret på slug
    getShop(), // Henter alle produkter i shoppen (bruges til at finde relaterede produkter)
  ]);

  if (!product) return <div>Produkt ikke fundet</div>;

  return (
    <>
      <Banner title="Produktet" />
      <Product product={product} allProducts={shopData.products} />
    </>
  );
}
