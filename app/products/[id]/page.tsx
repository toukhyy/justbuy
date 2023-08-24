import Image from 'next/image';
import { formatPrice } from '@/utils/formatPrice';
import { ProductSearchParams } from '@/types/SearchParams';
import { AddCartBtn } from '@/components';
import './style.scss';

type Props = {
  searchParams: ProductSearchParams;
  params: { id: string };
};

function Products({ searchParams, params }: Props) {
  const { name, image, description, price } = searchParams;

  return (
    <main className="container product-page">
      {/* img */}
      <div className="product-page__img">
        <Image
          src={image}
          width={270}
          height={270}
          alt={`Photo of Product: ${name}`}
          style={{ objectFit: 'contain' }}
        />
      </div>

      <div className="product-page__content">
        <h2 className="product-page__label">{name}</h2>
        <p className="product-page__description">{description}</p>
        {price && <p className="product-page__price">${formatPrice(price)}</p>}
        <AddCartBtn productData={{ name, price, id: params.id, image }} />
      </div>
    </main>
  );
}

export default Products;
