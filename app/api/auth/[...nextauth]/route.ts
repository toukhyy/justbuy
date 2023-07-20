import NextAuth, { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { PrismaClient } from '@prisma/client';
import { Adapter } from 'next-auth/adapters';
import Stripe from 'stripe';

const prisma = new PrismaClient();

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
      const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
        apiVersion: '2022-11-15',
      });

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
