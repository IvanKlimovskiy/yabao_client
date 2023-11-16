import { MenuObject } from "../menu/index.types";

export enum ModalType {
  ProductDetails = "PRODUCT_DETAILS",
  Entering = "ENTERING",
  Accept = "ACCEPT",
  Error = "ERROR",
}

export interface modalState {
  isOpenedModal: boolean;
  modalDetails: MenuObject | null;
  type: ModalType | null;
}
