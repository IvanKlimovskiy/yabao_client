import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { CartState, CartElement } from "./index.types";

const initialState: CartState = {
  isOpenedCart: false,
  cart: [],
  total: 0,
};

const cart = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartElement>) => {
      const isIncludeElement = state.cart.some(
        (element) => element._id === action.payload._id,
      );
      if (isIncludeElement) {
        const menuElement = state.cart.find(
          (element) => element._id === action.payload._id,
        );
        if (menuElement) {
          menuElement.amount += 1;
          state.total += menuElement.price;
        }
      } else {
        state.cart.push(action.payload);
        state.total += action.payload.price * action.payload.amount;
      }
    },
    removeFromCart: (state, action: PayloadAction<CartElement>) => {
      state.cart = state.cart.filter(
        (element) => element._id !== action.payload._id,
      );
      state.total -= action.payload.price;
    },
    increaseAmount: (state, action: PayloadAction<string>) => {
      const menuElement = state.cart.find(
        (element) => element._id === action.payload,
      );
      if (menuElement) {
        menuElement.amount += 1;
        state.total += menuElement.price;
      }
    },
    decreaseAmount: (state, action: PayloadAction<string>) => {
      const menuElement = state.cart.find(
        (element) => element._id === action.payload,
      );
      if (menuElement) {
        if (menuElement.amount === 1) {
          state.cart = state.cart.filter(
            (element) => element._id !== action.payload,
          );
          state.total -= menuElement.price;
        } else {
          menuElement.amount -= 1;
          state.total -= menuElement.price;
        }
      }
    },
    toggleCart: (state, action: PayloadAction<boolean>) => {
      state.isOpenedCart = action.payload;
    },
  },
});

const { actions, reducer } = cart;
export const {
  addToCart,
  removeFromCart,
  increaseAmount,
  decreaseAmount,
  toggleCart,
} = actions;
export default reducer;
