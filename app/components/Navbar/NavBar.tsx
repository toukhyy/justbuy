'use client';
import Image from 'next/image';
import { Session } from 'next-auth';
type Props = {} & Pick<Session, 'user'>;
import { signIn, signOut } from 'next-auth/react';
import './_style.scss';

function NavBar({ user }: Props) {
  return (
    <nav className="navBar">
      <h1>header 1</h1>
      <ul>
        {user ? (
          <>
            <li>
              <Image
                src={user.image as string}
                alt="user profile picture"
                width={48}
                height={48}
              />
            </li>
            <li>
              <button onClick={() => signOut()} className="authBtn">
                Sign out
              </button>
            </li>
          </>
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
