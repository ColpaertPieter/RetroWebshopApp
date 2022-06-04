import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  total: 0,
  quantity: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    addProduct: (state, action) => {
      const itemIndex = state.items.findIndex(
        (cartItem) => cartItem.name === action.payload.name
      );
      if (itemIndex >= 0) {
        state.items[itemIndex].qty += 1;
      } else {
        const tempProduct = { ...action.payload, qty: 1 };
        state.items.push(tempProduct);
      }
    },
    removeProduct: (state, action) => {
      state.items.map((cartItem) => {
        if (cartItem.name === action.payload.name) {
          const nextCartItems = state.items.filter(
            (item) => item.name !== cartItem.name
          );
          state.items = nextCartItems;
        }
      });
      return state;
    },
    getTotalPrice: (state, action) => {
      let { total, quantity } = state.items.reduce(
        (cartTotal, cartItem) => {
          const { price, qty } = cartItem;
          const itemTotal = price * qty;

          cartTotal.total += itemTotal;
          cartTotal.quantity += qty;

          return cartTotal;
        },
        {
          total: 0,
          quantity: 0,
        }
      );
      state.quantity = quantity;
      state.total = total;
    },
    reset: () => initialState,
  },
});

export const { actions, reducer } = cartSlice;
export const { addProduct, removeProduct, getTotalPrice, reset } = actions;
