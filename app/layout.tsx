import type { Metadata } from 'next';
import { NavBar } from '@/components';
import { getServerSession } from 'next-auth/next';
import { authOpts } from './api/auth/[...nextauth]/route';
import ReduxProvider from '@/store/Provider';
import './styles/style.scss';

export const metadata: Metadata = {
  title: 'Just Buy store',
  description: 'created by Toukhy',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOpts);

  return (
    <html lang="en">
      <body>
        <ReduxProvider>
          <NavBar user={session?.user} />
          {children}
        </ReduxProvider>
      </body>
    </html>
  );
}
