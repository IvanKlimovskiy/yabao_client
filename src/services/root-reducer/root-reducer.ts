import { combineReducers } from "@reduxjs/toolkit";
import modal from "../slices/modal/modal";
import cart from "../slices/cart/cart";
import menu from "../slices/menu/menu";
import users from "../slices/users/users";

const rootReducer = combineReducers({ modal, cart, menu, users });

export default rootReducer;
