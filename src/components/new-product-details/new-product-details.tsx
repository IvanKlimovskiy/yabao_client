import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import {
  useAppDispatch,
  useAppSelector,
} from "../../services/store/store.types";
import { close, removeModalDetails } from "../../services/slices/modal/modal";
import styles from "./new-product-details.module.css";

const NewProductDetails = () => {
  const dispatch = useAppDispatch();
  const { isOpenedModal, modalDetails } = useAppSelector(
    (state) => state.modal,
  );
  const handleClickCloseButton = () => {
    dispatch(close());
    dispatch(removeModalDetails());
  };

  return (
    modalDetails && (
      <Modal
        onHide={handleClickCloseButton}
        show={isOpenedModal}
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
          <Button className={styles.button} onClick={handleClickCloseButton}>
            Закрыть
          </Button>
        </Modal.Footer>
      </Modal>
    )
  );
};

export default NewProductDetails;
