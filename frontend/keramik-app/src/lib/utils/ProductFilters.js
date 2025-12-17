export function getFilteredProducts(products, filterType) {
  // Sikkerhedsnet
  if (!products) return [];

  // Kun produkter (ikke kategorier osv.)
  const cleanProducts = products.filter((p) => p.contentType === 'product');

  switch (filterType) {
    case 'Nyeste':
      // Sorter efter dato og tag top 4
      return cleanProducts
        .sort((a, b) => new Date(b.createDate) - new Date(a.createDate))
        .slice(0, 4);

    case 'De Grønne':
      // Filtrer på farve
      return cleanProducts.filter((p) => p.properties.color === 'Grøn').slice(0, 4);

    default:
      return cleanProducts.slice(0, 4);
  }
}
