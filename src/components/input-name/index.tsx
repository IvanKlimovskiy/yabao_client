import React, { useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../services/store/index.types.ts';
import { ProfileDataType } from '../../services/slices/profile/index.types.ts';
import { Spinner } from 'react-bootstrap';
import styles from './index.module.css';
import { setProfileData } from '../../services/slices/profile';
import api from '../../http/api.ts';

const InputName = () => {
  const dispatch = useAppDispatch();
  const { _id, name } = useAppSelector((state) => state.profile.profileData);
  const [isChangingName, setIsChangingName] = useState(false);
  const [nameInput, setNameInput] = useState(name);
  const [isDisabled, setIsDisabled] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);
  const onChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNameInput(event.target.value);
  };
  const changeInputHandler = () => {
    if (!isDisabled) {
      setIsChangingName(true);
      api
        .patch<{ status: string; user: ProfileDataType }>(`/users/${_id}/name`, { name: nameInput })
        .then((response) => {
          const { user } = response.data;
          dispatch(setProfileData(user));
        })
        .catch((err) => console.log(err))
        .finally(() => {
          setIsChangingName(false);
        });
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
  return (
    <label className={styles.label} htmlFor="name">
      Имя
      <input
        ref={inputRef}
        className={styles.input}
        disabled={isDisabled || isChangingName}
        id="name"
        name="name"
        type="text"
        value={nameInput}
        onChange={onChangeName}
      />
      <button
        disabled={isChangingName}
        className={isChangingName ? `${styles.changeInput} ${styles.changeInput_disabled}` : styles.changeInput}
        onClick={changeInputHandler}
        type="button">
        {isDisabled && !isChangingName ? 'Изменить' : isChangingName ? 'Сохранение...' : 'Сохранить'}
      </button>
      {isDisabled ? null : (
        <button
          onClick={() => {
            setNameInput(name);
            setIsDisabled(true);
          }}
          type="button"
          className={styles.cancel}>
          Отменить
        </button>
      )}
      {isChangingName ? (
        <div className={styles.spinner}>
          <Spinner size="sm" />
        </div>
      ) : null}
    </label>
  );
};

export default InputName;
