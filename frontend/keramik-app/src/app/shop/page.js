import { getShop } from '@/lib/shop/api-helpers/getShop';
import ShopClient from '@/components/ShopClient';
import Banner from '@/components/Banner';

export default async function ShopPage() {
  const { products, categories } = await getShop(); // Henter alle produkter server-side

  return (
    <div>
      <Banner title="Shop" />

      {/* Vi sender alle produkter ind. Grid'et styrer selv visningen af de første 8 */}
      <ShopClient products={products} categories={categories} itemsPerPage={8} />
    </div>
  );
}
