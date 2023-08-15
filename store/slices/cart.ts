import { createSlice, current } from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit';
import { CartType } from '@/types/Cart';

export type CartState = {
  cart: CartType[];
  isOpen: boolean;
};

const initialState: CartState = {
  cart: [],
  isOpen: false,
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    toggleCart: (state) => {
      state.isOpen = !state.isOpen;
    },

    addProduct: (state, action: PayloadAction<CartType>) => {
      const productExists = state.cart.find(
        (item) => item.id === action.payload.id
      );

      if (productExists) {
        state.cart = state.cart.map((item) => {
          if (item.id !== action.payload.id) return item;
          return {
            ...item,
            quantity: ++item.quantity,
          };
        });
      } else {
        state.cart.push(action.payload);
      }
    },

    removeProduct: (state, action: PayloadAction<{ id: string }>) => {
      const products = state.cart.filter(
        (prod) => prod.id !== action.payload.id
      );

      state.cart = products;
    },

    changeQuantity: (
      { cart },
      action: PayloadAction<{ id: string; operation: 'increase' | 'decrease' }>
    ) => {
      const item = cart.find((item) => item.id === action.payload.id);

      if (item?.quantity! >= 1 && action.payload.operation === 'increase') {
        cart = cart.map((item) => {
          if (item.id !== action.payload.id) return item;
          return {
            ...item,
            quantity: ++item.quantity,
          };
        });
      }

      if (item?.quantity! > 1 && action.payload.operation === 'decrease') {
        cart = cart.map((item) => {
          if (item.id !== action.payload.id) return item;
          return {
            ...item,
            quantity: --item.quantity,
          };
        });
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const { toggleCart, addProduct, removeProduct, changeQuantity } =
  cartSlice.actions;

export const cartReducer = cartSlice.reducer;
