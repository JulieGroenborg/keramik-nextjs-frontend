import { getShop } from '../../lib/getShop';
import { getProduct } from '../../lib/getProduct';

export default function ProductPage({ product }) {
  if (!product) return <div>Product not found</div>;

  return (
    <div>
      <h1>{product.name}</h1>
      <p>{product.properties.description}</p>
      <p>Price: {product.properties.price} DKK</p>

      {product.properties.image?.map((img) => (
        <img key={img.id} src={img.url} alt={img.name} width={img.width} height={img.height} />
      ))}

      <p>Material: {product.properties.material}</p>
      <p>Finishing: {product.properties.finishing}</p>
      <p>Color: {product.properties.color}</p>
      <p>Size: {product.properties.size}</p>
    </div>
  );
}

export async function getServerSideProps({ params }) {
  // Reconstruct the full path from [...slug] parameter
  const slugPath = '/' + params.slug.join('/') + '/';

  // 1️⃣ Get all products (to map URL → ID)
  const { products } = await getShop();

  // 2️⃣ Find the product with a matching route.path
  const productMeta = products.find((p) => p.route.path === slugPath);

  if (!productMeta) {
    // Return 404 if product not found
    return { notFound: true };
  }

  // 3️⃣ Fetch the full product by ID from Umbraco v2
  const product = await getProduct(productMeta.id);

  return {
    props: { product },
  };
}
