import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { modalState, ModalType } from "./index.types";
import { MenuObject } from "../menu/index.types";

const initialState: modalState = {
  isOpenedModal: false,
  modalDetails: null,
  type: null,
};

const modal = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (state, action: PayloadAction<ModalType>) => {
      state.isOpenedModal = true;
      state.type = action.payload;
    },
    closeModal: (state) => {
      state.type = null;
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
export const { openModal, closeModal, setModalDetails, removeModalDetails } =
  actions;
export default reducer;
