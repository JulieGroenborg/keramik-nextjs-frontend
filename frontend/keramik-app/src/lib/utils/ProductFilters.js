export function getFilteredProducts(products, filterType) {
  if (!products) return [];

  // Sørger for, at vi kun arbejder med produkter
  const cleanProducts = products.filter((p) => p.contentType === 'product');

  switch (filterType) {
    case 'Nyeste':
      // Sorter efter dato og tag top 4
      return cleanProducts
        .sort((a, b) => new Date(b.createDate) - new Date(a.createDate))
        .slice(0, 4);

    case 'De Grønne':
      // Filtrer på farven grøn
      return cleanProducts.filter((p) => p.properties.color === 'Grøn').slice(0, 4);

    case 'De Blå':
      // Filtrer på farven blå
      return cleanProducts.filter((p) => p.properties.color === 'Blå').slice(0, 4);

    default:
      return cleanProducts.slice(0, 4);
  }
}
