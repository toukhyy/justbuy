import { stripe } from '@/lib/stripe';
import { ProductCard } from '@/components';

const getProducts = async () => {
  const productsWithoutPrices = (await stripe.products.list()).data;

  const products = await Promise.all(
    productsWithoutPrices.map(async (product) => {
      const priceObj = await stripe.prices.retrieve(
        product.default_price as string
      );

      return {
        id: product.id,
        image: product.images[0],
        name: product.name,
        price: priceObj.unit_amount,
        currency: priceObj.currency,
        description: product.description,
      };
    })
  );

  return products;
};

export default async function Home() {
  const products = await getProducts();

  return (
    <main className="container grid-layout">
      {products.map((product) => (
        <ProductCard key={product.id} {...product} />
      ))}
    </main>
  );
}
