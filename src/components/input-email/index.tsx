import React, { useRef, useState } from 'react';
import styles from './index.module.css';
import { useAppDispatch, useAppSelector } from '../../services/store/index.types.ts';
import Tooltip from '../tooltip';
import { ModalType } from '../../services/slices/modal/index.types.ts';
import { openModal } from '../../services/slices/modal';
import { setProfileData } from 'services/slices/profile/index.ts';

const InputEmail = () => {
  const dispatch = useAppDispatch();
  const { email, isActivated } = useAppSelector((state) => state.profile.profileData);
  const profileData = useAppSelector((state) => state.profile.profileData);
  const [emailInput, setEmailInput] = useState(email);
  const [isDisabled, setIsDisabled] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);
  const onChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmailInput(event.target.value);
  };
  const changeInput = () => {
    if (!isDisabled) {
      setIsDisabled(true);
      dispatch(setProfileData({ ...profileData, email: emailInput }));
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
    if (emailInput === 'example@email.com') {
      return dispatch(openModal(ModalType.Error));
    }
    dispatch(openModal(ModalType.Accept));
  };
  return (
    <label className={styles.label} htmlFor="email">
      Почта
      <input
        ref={inputRef}
        disabled={isDisabled}
        className={isActivated ? styles.input : `${styles.input} ${styles.input_notActivated}`}
        id="email"
        name="email"
        type="text"
        value={emailInput}
        onChange={onChangeEmail}
      />
      {!isActivated ? (
        <button
          className={isActivated ? styles.changeInput : `${styles.changeInput} ${styles.changeInput_type_email}`}
          onClick={changeInput}
          type="button">
          {isDisabled ? 'Изменить' : 'Сохранить'}
        </button>
      ) : null}
      {isDisabled ? null : (
        <button
          onClick={() => {
            setEmailInput(email);
            setIsDisabled(true);
          }}
          type="button"
          className={!isActivated ? `${styles.cancel} ${styles.cancel_type_email}` : styles.cancel}>
          Отменить
        </button>
      )}
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
