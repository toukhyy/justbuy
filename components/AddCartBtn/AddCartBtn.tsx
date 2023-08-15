'use client';
import { useDispatch } from 'react-redux';
import { addProduct } from '@/store/slices/cart';
import './style.scss';

type Props = {
  productData: {
    id: string;
    image: string;
    name: string;
    price: number | null;
  };
};

export function AddCartBtn({ productData }: Props) {
  const { id, name, price, image } = productData;
  const dispatch = useDispatch();

  const handleAddItem = () => {
    dispatch(
      addProduct({
        id: id,
        image: image,
        name: name,
        price: price,
        quantity: 1,
      })
    );
  };

  return (
    <button className="add-cart-btn" onClick={handleAddItem}>
      Add to Cart
    </button>
  );
}
