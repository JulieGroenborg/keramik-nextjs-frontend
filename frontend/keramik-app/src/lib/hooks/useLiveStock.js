import { useState, useEffect } from 'react';

export function useLiveStock(initialStock, productId) {
  // Opretter en state til det aktuelle lagerantal
  const [stock, setStock] = useState(initialStock);

  useEffect(() => {
    const handleStockUpdate = (event) => {
      const { productId: updatedId, stock: newStock } = event.detail;

      // Hvis det modtagne ID matcher produktet, opdateres tallet
      if (updatedId === productId) {
        setStock(newStock);
      }
    };

    // Begynder at lytte efter signalet 'stockUpdate'
    window.addEventListener('stockUpdate', handleStockUpdate);

    // Stopper med at lytte, når komponenten ikke længere er i brug
    return () => window.removeEventListener('stockUpdate', handleStockUpdate);
  }, [productId]);

  // Returnerer det opdaterede lagertal til den fil, der kalder denne hook
  return stock;
}
