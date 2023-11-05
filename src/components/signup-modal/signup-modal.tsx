import React, { useState } from "react";
import validator from "validator";
import Modal from "react-bootstrap/Modal";
import CloseButton from "react-bootstrap/CloseButton";
import err from "../../images/validation.svg";
import styles from "./signup-modal.module.css";
import {
  useAppDispatch,
  useAppSelector,
} from "../../services/store/store.types";
import { ModalType } from "../../services/slices/modal/modal.types";
import { close } from "../../services/slices/modal/modal";
import { fetchCode } from "../../utils/utils.tsx";
import {
  setAccessToken,
  setIsAuthorized,
} from "../../services/slices/profile/profile.ts";
import { AuthenticatedUserData } from "./signup-modal.types.ts";

const SignupModal = () => {
  const { isOpenedModal, type } = useAppSelector((state) => state.modal);
  const dispatch = useAppDispatch();
  const closeModal = () => {
    dispatch(close());
  };
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [isCodeVerifying, setIsCodeVerifying] = useState(false);
  const [isDisabledInput, setIsDisabledInput] = useState(true);
  const [isValidationError, setIsValidationError] = useState(false);
  const [number, setNumber] = useState("");
  const [code, setCode] = useState("");
  const isCorrectPhoneNumber = validator.isMobilePhone(number, "ru-RU", {
    strictMode: true,
  });
  const requestCode = () => {
    setIsCodeSent(true);
    fetchCode("/api/auth/login", { number }, "GET_CODE").then((data) => {
      console.log(data);
    });
  };
  const handleClick = () => {
    if (isCorrectPhoneNumber) {
      requestCode();
    } else {
      setIsValidationError(true);
    }
  };
  const changeInputNumber = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newNumber = event.target.value;
    setNumber(newNumber);
    newNumber.length === 0 ? setIsValidationError(false) : null;
  };
  const changeInputCode = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newCode = event.target.value;
    setCode(newCode);
    if (newCode.length === 4) {
      setIsCodeVerifying(true);
      fetchCode("/api/auth/verify", { number, code: +newCode }, "VERIFY_CODE")
        .then((data: AuthenticatedUserData) => {
          console.log(data);
          localStorage.setItem(
            "refreshToken",
            JSON.stringify(data.tokens.refreshToken),
          );
          dispatch(setAccessToken(data.tokens.accessToken));
          dispatch(setIsAuthorized(true));
          setIsCodeVerifying(false);
          setCode("");
          setNumber("");
          closeModal();
        })
        .catch((err: { statusCode: string; message: string }) => {
          console.log(`${err.message}. ${err.statusCode}`);
        });
    }
  };
  const unauthorizedModalView = (
    <>
      <form className={styles.form}>
        <label className={styles.label} htmlFor="phone">
          Номер телефона
        </label>
        <input
          placeholder={"+7 (123) 456-78-90"}
          onChange={changeInputNumber}
          value={number}
          className={styles.input}
          id="phone"
          name="phone"
          type="text"
        />
        <div
          className={
            isValidationError
              ? `${styles.validationError} ${styles.validationError_visible}`
              : styles.validationError
          }
        >
          <img src={err} alt="!" />
          <span>Неверный номер</span>
        </div>
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
      <form className={`${styles.form} ${styles.form_sentCode}`}>
        <label
          className={`${styles.label} ${styles.label_sentCode}`}
          htmlFor="phone"
        >
          Номер телефона
        </label>
        <input
          disabled={isDisabledInput}
          onChange={changeInputNumber}
          value={number}
          className={`${styles.input} ${styles.input_disabled}`}
          id="phone"
          name="phone"
          type="text"
        />
        <button
          disabled={isCodeVerifying}
          type="button"
          onClick={() => setIsDisabledInput(false)}
          className={styles.changeNumberButton}
        >
          Изменить
        </button>
      </form>
      <form
        className={`${styles.form} ${styles.form_sentCode} ${styles.form_code}`}
      >
        <label
          className={`${styles.label} ${styles.label_code}`}
          htmlFor="code"
        >
          Код из СМС
        </label>
        <input
          disabled={isCodeVerifying}
          onChange={changeInputCode}
          value={code}
          className={`${styles.input} ${styles.input_code}`}
          id="code"
          name="code"
          type="text"
        />
        <button
          disabled={isCodeVerifying}
          className={styles.changeNumberButton}
        >
          Получить новый код
        </button>
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
      contentClassName={
        isCodeSent ? styles.container_sentCode : styles.container
      }
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
