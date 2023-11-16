import React, { useRef, useState } from "react";
import { Spinner } from "react-bootstrap";
import styles from "./index.module.css";
import {
  useAppDispatch,
  useAppSelector,
} from "../../services/store/index.types.ts";
import api from "../../http/api.ts";
import Tooltip from "../tooltip";
import { ModalType } from "../../services/slices/modal/index.types.ts";
import { closeModal, openModal } from "../../services/slices/modal";

const InputEmail = () => {
  const dispatch = useAppDispatch();
  const { email, isActivated, number } = useAppSelector(
    (state) => state.profile.profileData,
  );
  const { isLoading } = useAppSelector((state) => state.profile);
  const [emailInput, setEmailInput] = useState(email);
  const [isDisabled, setIsDisabled] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);
  const onChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmailInput(event.target.value);
  };
  const changeInput = () => {
    if (!isDisabled) {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.focus();
        }
      }, 0);
    }
  };
  const verifyEmail = () => {
    if (emailInput === "example@email.com") {
      return dispatch(openModal(ModalType.Error));
    }
    dispatch(openModal(ModalType.Accept));
    return api
      .post("/auth/activate/email", {
        email: emailInput,
        number,
      })
      .then(() => {
        dispatch(closeModal());
      });
  };
  return (
    <label className={styles.label} htmlFor="email">
      Почта
      <input
        ref={inputRef}
        disabled={isDisabled || isLoading}
        className={
          isActivated
            ? styles.input
            : `${styles.input} ${styles.input_notActivated}`
        }
        id="email"
        name="email"
        type="text"
        value={emailInput}
        onChange={onChangeEmail}
      />
      <button
        className={
          isActivated
            ? styles.changeInput
            : `${styles.changeInput} ${styles.changeInput_type_email}`
        }
        onClick={changeInput}
        type="button"
      >
        {isDisabled ? "Изменить" : "Сохранить"}
      </button>
      {isDisabled ? null : (
        <button
          onClick={() => {
            setEmailInput(email);
            setIsDisabled(true);
          }}
          type="button"
          className={
            !isActivated
              ? `${styles.cancel} ${styles.cancel_type_email}`
              : styles.cancel
          }
        >
          Отменить
        </button>
      )}
      {isLoading ? <Spinner size="sm" /> : null}
      {!isActivated ? (
        <Tooltip>
          <span onClick={verifyEmail} className={styles.warning}>
            Подтвердите Вашу почту
          </span>
        </Tooltip>
      ) : null}
    </label>
  );
};

export default InputEmail;
