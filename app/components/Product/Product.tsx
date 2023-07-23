import Image from 'next/image';
import Link from 'next/link';
import { formatPrice } from '@/utils/formatPrice';
import './_product.scss';

type Props = {
  id: string;
  name: string;
  image: string;
  price: number | null;
  description: string | null;
  currency: string | null;
};

function Product({ id, price, image, name, description }: Props) {
  return (
    <div className="productCard">
      <Link
        href={{
          pathname: `/products/${id}`,
          query: {
            price,
            name,
            description,
            image,
          },
        }}
      >
        <div className="imgContainer">
          <Image
            src={image}
            fill={true}
            alt={`Photo of Product: ${name}`}
            style={{ objectFit: 'contain' }}
          />
        </div>
      </Link>
      <div className="textContainer">
        <h2 className="label">{name}</h2>
        <p className="description">{description}</p>
        {price && <p className="price">${formatPrice(price)}</p>}
      </div>
    </div>
  );
}

export default Product;
