import { getShop } from './getShop'; // Importere getShop() funktion, så vi kan hente fuld liste af produkter, så vi kan søge for specifikt produkt by slug.

export async function getProductBySlug(slug) {
  const { products } = await getShop(); // Henter alle produkter ved hvert besøg.

  const product = products.find((p) => {
    const last = p.route.path.split('/').filter(Boolean).pop();
    return last.toLowerCase() === slug.toLowerCase();
  });

  return product || null;
}
