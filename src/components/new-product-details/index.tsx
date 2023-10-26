import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import ReactDOM from "react-dom";
import { useAppDispatch, useAppSelector } from "../../types/hooks";
import { close } from "../../services/slices/modal";

const NewProductDetails = () => {
  const dispatch = useAppDispatch();
  const { isOpenedModal } = useAppSelector((state) => state.modalSlice);
  const productDetails = useAppSelector(
    (state) => state.modalSlice.modalDetails,
  );
  const handleClickCloseButton = () => {
    dispatch(close());
  };

  const modal = productDetails && (
    <Modal
      show={isOpenedModal}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton></Modal.Header>
      <Modal.Body>
        <img src={productDetails.img} alt={productDetails.name} />
        <h3>{productDetails.name}</h3>
        <p>{productDetails.description}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleClickCloseButton}>Close</Button>
      </Modal.Footer>
    </Modal>
  );

  return ReactDOM.createPortal(
    modal,
    document.getElementById("modals") as HTMLElement,
  );
};

export default NewProductDetails;
