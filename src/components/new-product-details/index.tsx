import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import {
  useAppDispatch,
  useAppSelector,
} from "../../services/store/index.types";
import { close, removeModalDetails } from "../../services/slices/modal";
import styles from "./index.module.css";
import React from "react";

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
            <h3 className={styles["new-product-details__heading"]}>
              {modalDetails.name}
            </h3>
          </Modal.Title>
        </Modal.Header>

        <Modal.Body className={styles["new-product-details"]}>
          <img src={modalDetails.img} alt={modalDetails.name} />
          <p className={styles["new-product-details__description"]}>
            {modalDetails.description}
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button
            className={styles["new-product-details__button"]}
            onClick={handleClickCloseButton}
          >
            Закрыть
          </Button>
        </Modal.Footer>
      </Modal>
    )
  );
};

export default NewProductDetails;
