import Image from 'next/image';
import { formatPrice } from '@/utils/formatPrice';
import './_productPage.scss';

type Props = {
  searchParams: {
    name: string;
    image: string;
    description?: string;
    price?: number;
  };
  params?: { id: string };
};

function Products({ searchParams }: Props) {
  const { name, image, description, price } = searchParams;
  return (
    <main className="container productPage">
      {/* img */}
      <div className="imgContainer">
        <Image
          src={image}
          fill={true}
          alt={`Photo of Product: ${name}`}
          style={{ objectFit: 'contain' }}
        />
      </div>

      <div className="textContainer">
        <h2 className="label">{name}</h2>
        <p className="description">{description}</p>
        {price && <p className="price">${formatPrice(price)}</p>}
      </div>
      {/* text */}
    </main>
  );
}

export default Products;
