import { MenuObject } from "../menu/index.types";

export interface modalState {
  isOpenedModal: boolean;
  modalDetails: MenuObject | null;
}
