export async function getProduct(id) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_UMBRACO_URL}/content/items?id=${id}`, {
    cache: 'no-store',
  });

  if (!res.ok) throw new Error('Failed to fetch product');

  const { items } = await res.json();
  return items[0] || null; // single product
}
