import { FC } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import {
  useAppDispatch,
  useAppSelector,
} from "../../services/store/index.types.ts";
import { closeModal } from "../../services/slices/modal";
import { AcceptModalComponent } from "./index.types.ts";
import { ModalType } from "../../services/slices/modal/index.types.ts";

const InfoModal: FC<AcceptModalComponent> = ({
  children,
  typeModal,
  title,
}) => {
  const dispatch = useAppDispatch();
  const { isOpenedModal, type } = useAppSelector((state) => state.modal);
  const closeInfoModal = () => {
    dispatch(closeModal());
  };
  return (
    <Modal
      onHide={closeModal}
      show={isOpenedModal && type === typeModal}
      size="sm"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4 style={{ fontSize: "1.2rem" }}>{children}</h4>
      </Modal.Body>
      <Modal.Footer>
        {typeModal === ModalType.Accept ? <Button>Да</Button> : null}
        <Button
          onClick={() => {
            dispatch(closeInfoModal);
          }}
        >
          {typeModal === ModalType.Accept ? "Нет" : "ОК"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default InfoModal;
