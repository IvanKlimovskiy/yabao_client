import { MenuObject } from "../menu/index.types";

export interface CartElement extends MenuObject {
  amount: number;
}
export interface CartState {
  isOpenedCart: boolean;
  cart: CartElement[];
  total: number;
}
