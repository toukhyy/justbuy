import { ProductType } from './Product';

export type ProductSearchParams = Pick<
  ProductType,
  'name' | 'image' | 'price' | 'description'
>;
