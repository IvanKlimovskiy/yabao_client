import { combineReducers } from "@reduxjs/toolkit";
import appSlice from "../slices/app";
const rootReducer = combineReducers({ appSlice });

export default rootReducer;
