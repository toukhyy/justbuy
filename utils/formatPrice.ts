export const formatPrice = (price: number) =>
  Intl.NumberFormat('en-US', {
    maximumFractionDigits: 2,
  }).format(price / 100);
