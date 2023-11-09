import { combineReducers } from "@reduxjs/toolkit";
import modal from "../slices/modal/index.ts";
import cart from "../slices/cart/index.ts";
import menu from "../slices/menu/index.ts";
import users from "../slices/users/index.ts";
import profile from "../slices/profile/index.ts";

const rootReducer = combineReducers({ modal, cart, menu, users, profile });

export default rootReducer;
