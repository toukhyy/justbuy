import NextAuth, { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { Adapter } from 'next-auth/adapters';
import { stripe } from '@/app/lib/stripe';
import { prisma } from '@/app/lib/prisma';

export const authOpts: NextAuthOptions = {
  adapter: PrismaAdapter(prisma) as Adapter,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  events: {
    createUser: async ({ user }) => {
      const { id } = await stripe.customers.create({
        name: user.name || undefined,
        email: user.email || undefined,
      });
      await prisma.user.update({
        where: { id: user.id },
        data: { stripeCId: id },
      });
    },
  },
};

const handler = NextAuth(authOpts);

export { handler as GET, handler as POST };
