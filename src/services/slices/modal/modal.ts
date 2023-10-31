import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { modalState } from "./modal.types";
import { MenuObject } from "../menu/menu.types";

const initialState: modalState = {
  isOpenedModal: false,
  modalDetails: null,
};

const modal = createSlice({
  name: "modal",
  initialState,
  reducers: {
    open: (state) => {
      state.isOpenedModal = true;
    },
    close: (state) => {
      state.isOpenedModal = false;
    },
    setModalDetails: (state, action: PayloadAction<MenuObject>) => {
      state.modalDetails = action.payload;
    },
    removeModalDetails: (state) => {
      state.modalDetails = null;
    },
  },
});

const { actions, reducer } = modal;
export const { open, close, setModalDetails, removeModalDetails } = actions;
export default reducer;
