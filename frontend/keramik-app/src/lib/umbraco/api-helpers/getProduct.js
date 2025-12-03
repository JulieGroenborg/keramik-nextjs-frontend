// export async function getProduct(slug) {
//   const res = await fetch(`${process.env.NEXT_PUBLIC_UMBRACO_URL}/content?filter=slugURL:${slug}`, {
//     cache: 'no-store',
//   });

//   if (!res.ok) throw new Error('Failed to fetch product');

//   const { items } = await res.json();
//   return items?.[0] ?? null; // return single product
// }
