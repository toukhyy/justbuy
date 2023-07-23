'use client';
import Image from 'next/image';
import { Session } from 'next-auth';
type Props = {} & Pick<Session, 'user'>;
import { signIn, signOut } from 'next-auth/react';
import Link from 'next/link';
import { AiOutlineBarcode } from 'react-icons/ai';
import './_navBar.scss';

function NavBar({ user }: Props) {
  return (
    <nav className="navBar">
      <Link href="/" className="LogoContainer">
        <AiOutlineBarcode size={24} />
        <span className="text">Just Buy</span>
      </Link>
      <ul>
        {user ? (
          <div className="profile">
            <li>
              <Image
                className="profileImg"
                src={user.image as string}
                alt="user profile picture"
                width={45}
                height={45}
              />
            </li>
            <li>
              <button onClick={() => signOut()} className="authBtn">
                Sign out
              </button>
            </li>
          </div>
        ) : (
          <li>
            <button onClick={() => signIn()} className="authBtn">
              Sign in
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default NavBar;
