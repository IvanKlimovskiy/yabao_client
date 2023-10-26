import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { CartState } from "./cart.types";
import { MenuObject } from "../menu/menu.types";

const initialState: CartState = {
  addedToCart: [],
};

const cart = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<MenuObject>) => {
      state.addedToCart.push(action.payload);
    },
    removeFromCart: (state, action: PayloadAction<MenuObject>) => {
      state.addedToCart = state.addedToCart.filter((element) => {
        return element._id !== action.payload._id;
      });
    },
  },
});

const { actions, reducer } = cart;
export const { addToCart, removeFromCart } = actions;
export default reducer;
