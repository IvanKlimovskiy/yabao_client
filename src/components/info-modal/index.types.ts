import { ModalType } from "../../services/slices/modal/index.types.ts";

export interface AcceptModalComponent {
  title: string;
  typeModal: ModalType;
  children: string;
}
