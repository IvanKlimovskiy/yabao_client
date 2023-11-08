import { MenuObject } from "../menu/menu.types";

export enum ModalType {
  ProductDetails = "PRODUCT_DETAILS",
  Entering = "ENTERING",
  Accept = "ACCEPT",
}
export interface modalState {
  isOpenedModal: boolean;
  modalDetails: MenuObject | null;
  type: ModalType | null;
}
