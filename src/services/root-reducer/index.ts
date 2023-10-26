import { combineReducers } from "@reduxjs/toolkit";
import modal from "../slices/modal";
import cart from "../slices/cart";
import menu from "../slices/menu";
import users from "../slices/users";
const rootReducer = combineReducers({ modal, cart, menu, users });

export default rootReducer;
