import Image from 'next/image';
import Link from 'next/link';
import { formatPrice } from '@/utils/formatPrice';
import { ProductType } from '@/types/Product';
import './style.scss';

export function ProductCard({
  id,
  price,
  image,
  name,
  description,
}: ProductType) {
  return (
    <div className="product-card">
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
        <div className="product-card__img">
          <Image
            src={image}
            width={220}
            height={220}
            alt={`Photo of Product: ${name}`}
            style={{ objectFit: 'contain' }}
          />
        </div>
      </Link>
      <div className="product-card__content">
        <h2 className="product-card__label">{name}</h2>
        <p className="product-card__description">{description}</p>

        {price && price > 0 ? (
          <p className="product-card__price">${price}</p>
        ) : null}
      </div>
    </div>
  );
}
