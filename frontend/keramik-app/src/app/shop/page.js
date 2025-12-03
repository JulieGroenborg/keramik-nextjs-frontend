import AddToBasket from '@/components/AddToBasket';
import { getShop } from '@/lib/umbraco/api-helpers/getShop';
import Image from 'next/image';

export default async function ShopPage() {
  const { categories, products } = await getShop();

  return (
    <div>
      <h1>Shop</h1>

      {/* Category menu */}
      {/* <ul>
        {categories.map((cat) => (
          <li key={cat.id}>{cat.name}</li>
        ))}
      </ul> */}

      {/* Products grid */}
      <div>
        {products.map((prod) => (
          <div key={prod.id}>
            <Image src={prod.properties.image?.[0]?.url} alt={prod.name} width={50} height={50} />
            <h2>{prod.name}</h2>
            <p>{prod.properties.price} kr.</p>
            <AddToBasket />
          </div>
        ))}
      </div>
    </div>
  );
}
