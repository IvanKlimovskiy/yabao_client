import React, { useRef, useState } from "react";
import { Spinner } from "react-bootstrap";
import validator from "validator";
import Modal from "react-bootstrap/Modal";
import CloseButton from "react-bootstrap/CloseButton";
import err from "../../images/validation.svg";
import styles from "./index.module.css";
import {
  useAppDispatch,
  useAppSelector,
} from "../../services/store/index.types.ts";
import { ModalType } from "../../services/slices/modal/index.types.ts";
import { close } from "../../services/slices/modal";
import { fetchCode, generateChangerInputValue } from "../../utils";
import {
  setAccessToken,
  setIsAuthorized,
  setProfileData,
} from "../../services/slices/profile";
import { AuthenticatedUserData, ResponseCodeType } from "./index.types.ts";

const SignupModal = () => {
  const { isOpenedModal, type } = useAppSelector((state) => state.modal);
  const codeInputRef = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();
  const closeModal = () => {
    dispatch(close());
  };
  const { isAuthorized } = useAppSelector((state) => state.profile);
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [isCodeVerifying, setIsCodeVerifying] = useState(false);
  const [isDisabledInput, setIsDisabledInput] = useState(true);
  const [isValidationError, setIsValidationError] = useState(false);
  const [number, setNumber] = useState("");
  const [code, setCode] = useState("");
  const isCorrectPhoneNumber = (value: string) =>
    validator.isMobilePhone(value, "ru-RU", {
      strictMode: true,
    });
  const codeHandler = (code: number) => {
    setIsCodeVerifying(true);
    fetchCode("/api/auth/verify", { number, code: +code }, "VERIFY_CODE")
      .then((data: AuthenticatedUserData) => {
        const { name, img, number, email, birthdate, isActivated } = data.user;
        const { accessToken, refreshToken } = data.tokens;
        localStorage.setItem("refreshToken", JSON.stringify(refreshToken));
        dispatch(setAccessToken(accessToken));
        dispatch(setIsAuthorized(true));
        dispatch(
          setProfileData({ name, img, number, email, birthdate, isActivated }),
        );
        setIsCodeVerifying(false);
        setIsCodeSent(false);
        setCode("");
        setNumber("");
        closeModal();
      })
      .catch((error: { statusCode: string; message: string }) => {
        console.log(`${error.message}. ${error.statusCode}`);
      });
  };
  const requestCode = () => {
    setIsCodeSent(true);
    fetchCode("/api/auth/login", { number }, "GET_CODE").then(
      (data: ResponseCodeType) => {
        if (codeInputRef.current) {
          codeInputRef.current.value = `${data.code}`;
          const newCode = `${data.code}`;
          setCode(`${data.code}`);
          if (newCode.length === 4) {
            codeHandler(+newCode);
          }
        }
      },
    );
  };
  const handleClick = () => {
    if (isCorrectPhoneNumber(number)) {
      requestCode();
    } else {
      setIsValidationError(true);
    }
  };
  const changeInputNumber = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newNumber = event.target.value;
    isCorrectPhoneNumber(newNumber)
      ? setIsValidationError(false)
      : setIsValidationError(true);
    generateChangerInputValue(setNumber, newNumber);
    newNumber.length === 0 ? setIsValidationError(false) : null;
  };
  const changeInputCode = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newCode = event.target.value;
    generateChangerInputValue(setCode, newCode);
    if (newCode.length === 4) {
      codeHandler(+newCode);
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
          className={
            isDisabledInput
              ? `${styles.input} ${styles.input_disabled}`
              : `${styles.input} ${styles.input_codeSent}`
          }
          id="phone"
          name="phone"
          type="text"
        />
        <button
          disabled={isCodeVerifying}
          type="button"
          onClick={() => {
            if (isCorrectPhoneNumber(number)) {
              setIsDisabledInput((prevState) => !prevState);
              setIsValidationError(false);
            } else {
              setIsValidationError(true);
            }
          }}
          className={styles.changeNumberButton}
        >
          {isDisabledInput ? "Изменить" : "Принять"}
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
          {isCodeVerifying ? (
            <Spinner className={styles.spinner} size="sm" />
          ) : null}
        </label>
        <input
          ref={codeInputRef}
          disabled={isCodeVerifying}
          onChange={changeInputCode}
          value={code}
          className={
            isCodeVerifying
              ? `${styles.input} ${styles.input_code} ${styles.input_verifying}`
              : `${styles.input} ${styles.input_code}`
          }
          id="code"
          name="code"
          type="text"
        />
        <div
          className={
            isValidationError
              ? `${styles.validationError} ${styles.validationError_visible} ${styles.validationError_secondModal}`
              : `${styles.validationError} ${styles.validationError_secondModal}`
          }
        >
          <img src={err} alt="!" />
          <span>Неверный номер</span>
        </div>
        <button
          type="button"
          onClick={handleClick}
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
        isCodeSent && !isAuthorized
          ? styles.container_sentCode
          : styles.container
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
