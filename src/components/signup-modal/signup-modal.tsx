import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import CloseButton from "react-bootstrap/CloseButton";
import styles from "./signup-modal.module.css";
import {
  useAppDispatch,
  useAppSelector,
} from "../../services/store/store.types";
import { ModalType } from "../../services/slices/modal/modal.types";
import { close } from "../../services/slices/modal/modal";
import { BASE_URL } from "../../constants/constants";
import { RequestCodeResponse } from "./signup-modal.types";

const SignupModal = () => {
  const { isOpenedModal, type } = useAppSelector((state) => state.modal);
  const dispatch = useAppDispatch();
  const closeModal = () => {
    dispatch(close());
  };
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [number, setNumber] = useState("");
  const [code, setCode] = useState("");
  const requestCode = () => {
    setIsCodeSent(true);
    fetch(`${BASE_URL}/api/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ number }),
    })
      .then((res) => res.json())
      .then((data: RequestCodeResponse) => {
        console.log(data);
      });
  };
  const handleClick = () => {
    requestCode();
  };
  const generateChangerInputValue = (
    fn: React.Dispatch<React.SetStateAction<string>>,
    value: string,
  ) => {
    fn(value);
  };
  const changeInputNumber = (event: React.ChangeEvent<HTMLInputElement>) => {
    generateChangerInputValue(setNumber, event.target.value);
  };
  const changeInputCode = (event: React.ChangeEvent<HTMLInputElement>) => {
    generateChangerInputValue(setCode, event.target.value);
  };
  const unauthorizedModalView = (
    <>
      <form className={styles.form}>
        <label className={styles.label} htmlFor="phone">
          Номер телефона
        </label>
        <input
          onChange={changeInputNumber}
          value={number}
          className={styles.input}
          id="phone"
          name="phone"
          type="text"
        />
      </form>
      <div className={styles.bottom}>
        <button onClick={handleClick} className={styles.button}>
          Выслать код
        </button>
        <p className={styles.text}>
          Продолжая, вы соглашаетесь{" "}
          <a href="">
            со сбором и обработкой персональных данных и пользовательским
            соглашением
          </a>
        </p>
      </div>
    </>
  );
  const sentCodeModalView = (
    <>
      <form className={styles.form}>
        <label className={styles.label} htmlFor="phone">
          Номер телефона
        </label>
        <input
          onChange={changeInputNumber}
          value={number}
          className={`${styles.input} ${styles.input_disabled}`}
          id="phone"
          name="phone"
          type="text"
        />
      </form>
      <form className={styles.form}>
        <label className={styles.label} htmlFor="code">
          Код из СМС
        </label>
        <input
          onChange={changeInputCode}
          value={code}
          className={`${styles.input} ${styles.input_disabled}`}
          id="phone"
          name="phone"
          type="text"
        />
      </form>
    </>
  );
  const modalView = !isCodeSent ? unauthorizedModalView : sentCodeModalView;

  return (
    <Modal
      size="lg"
      onHide={closeModal}
      show={isOpenedModal && type === ModalType.Entering}
      aria-labelledby="contained-modal-title-vcenter"
      centered
      contentClassName={styles.container}
    >
      <CloseButton
        onClick={closeModal}
        variant="white"
        className={styles.closeButton}
      />
      <Modal.Title className={styles.title}>Вход на сайт</Modal.Title>
      <Modal.Body className={styles.body}>{modalView}</Modal.Body>
    </Modal>
  );
};
export default SignupModal;
