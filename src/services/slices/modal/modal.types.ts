import { MenuObject } from "../menu/menu.types";

export interface modalState {
  isOpenedModal: boolean;
  modalDetails: MenuObject | null;
}
