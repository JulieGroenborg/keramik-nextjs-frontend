// GET all products and categories in shop.
export async function getShop() {
  // Fetch alle descendants under /shop.
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_UMBRACO_URL}/content?fetch=descendants:/shop&take=200`,
    { cache: 'no-store' } //no-store betyder, at next IKKE vil cache dette request, men at al data altid er friskt.
  );

  if (!res.ok) throw new Error('Failed to fetch shop descendants');

  const { items } = await res.json(); // flat data structure of all categories/products. Et stort array.

  // Separate categories og products into two arrays.
  const categories = items.filter((i) => i.contentType === 'category');
  const products = items.filter((i) => i.contentType === 'product');

  return {
    categories, // all categories
    products, // all products
  };
}
