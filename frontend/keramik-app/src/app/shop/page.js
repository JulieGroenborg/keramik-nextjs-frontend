import { getShop } from '@/lib/shop/api-helpers/getShop';
import ShopClient from '@/components/ShopClient';

export default async function ShopPage() {
  const { products } = await getShop();

  return (
    <>
      <h1>Shop</h1>
      {/* Products grid */}
      <ShopClient products={products} /> /
    </>
  );
}
