import ProductCard from './ProductCard';
import styles from '../css/components/RelatedProducts.module.css';

export default function RelatedProducts({ currentProduct, productsList }) {
  // Hvis data mangler, så vis ingenting
  if (!currentProduct || !productsList || productsList.length === 0) {
    return null;
  }

  const relatedProducts = getRelatedProducts(currentProduct, productsList, 4);

  // Hvis der ikke blev fundet nogen match overhovedet, vis intet
  if (relatedProducts.length === 0) {
    return null;
  }

  return (
    <div className={styles.grid}>
      {relatedProducts.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

// Denne funktion sorterer alle produkter og returnerer de bedste matches
function getRelatedProducts(currentProduct, allItems, maxItems) {
  // Fjern det produkt brugeren allerede kigger på
  const candidates = allItems.filter((item) => item.id !== currentProduct.id);

  // Giv point til hvert produkt
  const scoredCandidates = candidates.map((item) => {
    let score = 0;

    // Tjekker om kategori er det samme i begge URL'er
    const currentCategory = currentProduct.route.path.split('/')[2];
    const itemCategory = item.route.path.split('/')[2];

    if (currentCategory && itemCategory && currentCategory === itemCategory) {
      score += 6;
    }

    // Farve match
    if (item.properties.color && item.properties.color === currentProduct.properties.color) {
      score += 3;
    }

    // Materiale match
    if (
      item.properties.material &&
      item.properties.material === currentProduct.properties.material
    ) {
      score += 2;
    }

    // Størrelse match
    if (item.properties.size && item.properties.size === currentProduct.properties.size) {
      score += 1;
    }

    return { ...item, _score: score };
  });

  // Sorter efter point (højest først)
  scoredCandidates.sort((a, b) => b._score - a._score);

  // Returner kun de første 4 højest scorende matches
  return scoredCandidates.slice(0, maxItems);
}
