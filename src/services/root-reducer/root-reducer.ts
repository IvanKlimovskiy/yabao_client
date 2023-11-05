import { combineReducers } from "@reduxjs/toolkit";
import modal from "../slices/modal/modal";
import cart from "../slices/cart/cart";
import menu from "../slices/menu/menu";
import users from "../slices/users/users";
import profile from "../slices/profile/profile.ts";

const rootReducer = combineReducers({ modal, cart, menu, users, profile });

export default rootReducer;
