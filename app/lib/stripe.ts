import Stripe from 'stripe';

let stripe: Stripe;

if (process.env.NODE_ENV === 'production') {
  stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: '2022-11-15',
  });
} else {
  let globalWithStripe = global as typeof globalThis & {
    stripe: Stripe;
  };
  if (!globalWithStripe.stripe) {
    globalWithStripe.stripe = new Stripe(
      process.env.STRIPE_SECRET_KEY as string,
      {
        apiVersion: '2022-11-15',
      }
    );
  }
  stripe = globalWithStripe.stripe;
}

export { stripe };
