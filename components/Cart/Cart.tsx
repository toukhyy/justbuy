'use client';
import Image from 'next/image';
import { changeQuantity, toggleCart, removeProduct } from '@/store/slices/cart';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { formatPrice } from '@/utils/formatPrice';
import { BiSolidMinusCircle, BiSolidPlusCircle } from 'react-icons/bi';
import { RiShoppingBag3Fill } from 'react-icons/ri';
import { Divider } from '@/components/index';
import './style.scss';

type Props = {};

export function Cart({}: Props) {
  const cart = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();
  const handleQuantity = (id: string, operation: 'increase' | 'decrease') => {
    dispatch(changeQuantity({ id, operation }));
  };

  if (cart.isOpen)
    return (
      <div className="cart" onClick={() => dispatch(toggleCart())}>
        <div className="cart__side-bar" onClick={(e) => e.stopPropagation()}>
          <p className="cart__side-bar__title">My Cart</p>
          <Divider size="TWO-THIRDS" />
          <div className="cart__list hide-scroll-bar">
            {cart.cart.map((item) => (
              <div className="cart__item" key={item.id}>
                <Image
                  src={item.image}
                  height={70}
                  width={70}
                  alt={item.name}
                  style={{ objectFit: 'contain' }}
                />
                <div className="cart__item__content">
                  <p className="cart__item__content__title">{item.name}</p>
                  <div className="cart__qty-container">
                    <button>
                      <BiSolidMinusCircle
                        onClick={() => handleQuantity(item.id, 'decrease')}
                        className="cart__qty-container__btn"
                      />
                    </button>
                    <p>Qty:{item.quantity}</p>
                    <button>
                      <BiSolidPlusCircle
                        onClick={() => handleQuantity(item.id, 'increase')}
                        className="cart__qty-container__btn"
                      />
                    </button>
                  </div>
                  <p>${formatPrice(item.price || 0)}</p>
                  <button
                    className="cart__remove-btn"
                    onClick={() => dispatch(removeProduct({ id: item.id }))}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
            {(!cart.cart.length || cart.cart.length <= 0) && (
              <div className="cart__empty">
                <RiShoppingBag3Fill className="cart__empty__logo" />
                <p className="cart__empty__text">Your cart is empty</p>
              </div>
            )}
            <button
              disabled={!cart.cart.length || cart.cart.length <= 0}
              className="cart__checkout-btn"
            >
              Checkout
            </button>
          </div>
        </div>
      </div>
    );
}
