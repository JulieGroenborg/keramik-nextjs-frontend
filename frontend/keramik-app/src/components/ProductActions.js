'use client';
import { useState } from 'react';
import AddToBasket from './AddToBasket';

export default function ProductActions({ product }) {
  // State til at holde styr på hvor mange af produktet brugeren vil tilføje til kurven:
  const [quantity, setQuantity] = useState(1); // Starter med 1 som default.

  // Opretter array med tal fra 1 op til produktets stockQuantity; dropdown:
  const options = Array.from({ length: product.properties.stockQuantity }, (_, i) => i + 1);

  return (
    <div>
      <p>Vælg antal:</p>
      <select value={quantity} onChange={(e) => setQuantity(Number(e.target.value))}>
        {options.map((num) => (
          <option key={num} value={num}>
            {num}
          </option>
        ))}
      </select>
      <p>{product.properties.stockQuantity} på lager</p>
      <AddToBasket product={product} quantity={quantity} />
    </div>
  );
}
