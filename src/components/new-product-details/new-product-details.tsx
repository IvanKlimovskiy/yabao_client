import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import {
  useAppDispatch,
  useAppSelector,
} from "../../services/store/store.types";
import { close, removeModalDetails } from "../../services/slices/modal/modal";
import styles from "./new-product-details.module.css";
import { ModalType } from "../../services/slices/modal/modal.types";

const NewProductDetails = () => {
  const dispatch = useAppDispatch();
  const { isOpenedModal, modalDetails, type } = useAppSelector(
    (state) => state.modal,
  );
  const closeModal = () => {
    dispatch(close());
    dispatch(removeModalDetails());
  };

  return (
    modalDetails && (
      <Modal
        onHide={closeModal}
        show={isOpenedModal && type === ModalType.ProductDetails}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <h3 className={styles.title}>{modalDetails.name}</h3>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className={styles.details}>
          <img src={modalDetails.img} alt={modalDetails.name} />
          <p className={styles.description}>{modalDetails.description}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button className={styles.button} onClick={closeModal}>
            Закрыть
          </Button>
        </Modal.Footer>
      </Modal>
    )
  );
};

export default NewProductDetails;
