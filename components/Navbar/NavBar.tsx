'use client';
import Image from 'next/image';
import { Session } from 'next-auth';
import { signIn, signOut } from 'next-auth/react';
import Link from 'next/link';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { AiOutlineBarcode } from 'react-icons/ai';
import { IoCartSharp } from 'react-icons/io5';
import { toggleCart } from '@/store/slices/cart';
import { Cart } from '../index';
import { motion, AnimatePresence } from 'framer-motion';
import './style.scss';

type Props = {} & Pick<Session, 'user'>;

export function NavBar({ user }: Props) {
  const { cart, isOpen } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();

  return (
    <nav className="nav-bar">
      <Link href="/" className="nav-bar__logo">
        <AiOutlineBarcode size={24} />
        <span className="text">Just Buy</span>
      </Link>
      <ul className="nav-bar__user-menu">
        <li className="nav-bar__cart" onClick={() => dispatch(toggleCart())}>
          <IoCartSharp className="nav-bar__cart__icon" />
          {cart.length > 0 && (
            <motion.div
              animate={{ scale: 1 }}
              initial={{ scale: 0 }}
              className="nav-bar__cart__count"
            >
              <span>{cart.length}</span>
            </motion.div>
          )}
        </li>
        {user ? (
          <div className="nav-bar__profile">
            <li>
              <Image
                className="nav-bar__profile__img"
                src={user.image as string}
                alt="user profile picture"
                width={30}
                height={30}
              />
            </li>
            <li>
              <button onClick={() => signOut()} className="nav-bar__btn">
                Sign out
              </button>
            </li>
          </div>
        ) : (
          <li>
            <button onClick={() => signIn()} className="nav-bar__btn">
              Sign in
            </button>
          </li>
        )}
      </ul>
      <AnimatePresence>{isOpen && <Cart />}</AnimatePresence>
    </nav>
  );
}
