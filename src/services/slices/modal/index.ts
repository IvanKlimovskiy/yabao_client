import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { INewProductDetails, modalState } from "../../types/reducers";

const initialState: modalState = {
  isOpenedModal: false,
  modalDetails: null,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    open: (state) => {
      state.isOpenedModal = true;
    },
    close: (state) => {
      state.isOpenedModal = false;
    },
    setModalDetails: (state, action: PayloadAction<INewProductDetails>) => {
      state.modalDetails = action.payload;
    },
    removeModalDetails: (state) => {
      state.modalDetails = null;
    },
  },
});

const { actions, reducer } = modalSlice;
export const { open, close, setModalDetails, removeModalDetails } = actions;
export default reducer;
