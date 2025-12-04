import { getShop } from './getShop'; // Importere getShop() funktion, så vi kan hente fuld liste af produkter, så vi kan søge for specifikt produkt by slug.

export async function getProductBySlug(slug) {
  const { products } = await getShop(); // Kalder getShop() for at fetch alle produkter - fint for shop med under 200 produkter. Products er et array.

  // Vi bruger .find() til at loop igennem hvert produkt i products until callback returns true.
  const product = products.find((p) => {
    // Split makes path: "/shop/kopper/datter-koppen/" into an array: ["", "shop", "kopper", "datter-koppen", ""].Then .filter(Boolean) removes empty strings. .pop() then takes the last element which is the product slug: "datter-koppen".
    const last = p.route.path.split('/').filter(Boolean).pop();
    // last vil så være produktets slug. Slug kommer fra URL'en. Hvis de matcher returnerer .finds() produktet.
    return last.toLowerCase() === slug.toLowerCase();
  });

  return product || null; //null is clearer in API's than undefined.
}
