import React, { useRef, useState } from "react";
import { Spinner } from "react-bootstrap";
import styles from "./index.module.css";
import {
  useAppDispatch,
  useAppSelector,
} from "../../services/store/index.types.ts";
import { setIsLoading, setProfileData } from "../../services/slices/profile";
import api from "../../http/api.ts";
import { ProfileDataType } from "../../services/slices/profile/index.types.ts";

const InputName = () => {
  const dispatch = useAppDispatch();
  const { _id, name } = useAppSelector((state) => state.profile.profileData);
  const { isLoading } = useAppSelector((state) => state.profile);
  const [nameInput, setNameInput] = useState(name);
  const [isDisabled, setIsDisabled] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);
  const onChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNameInput(event.target.value);
  };
  const changeInputHandler = () => {
    if (!isDisabled) {
      dispatch(setIsLoading(true));
      api
        .patch<{ status: string; user: ProfileDataType }>(
          `/users/${_id}/name`,
          { name: nameInput },
        )
        .then((response) => {
          const { user } = response.data;
          dispatch(setProfileData(user));
        })
        .catch((err) => console.log(err))
        .finally(() => {
          dispatch(setIsLoading(false));
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
        disabled={isDisabled || isLoading}
        id="name"
        name="name"
        type="text"
        value={nameInput}
        onChange={onChangeName}
      />
      <button
        className={styles.changeInput}
        onClick={changeInputHandler}
        type="button"
      >
        {isDisabled ? "Изменить" : "Сохранить"}
      </button>
      {isDisabled ? null : (
        <button
          onClick={() => {
            setNameInput(name);
            setIsDisabled(true);
          }}
          type="button"
          className={styles.cancel}
        >
          Отменить
        </button>
      )}
      {isLoading ? <Spinner size="sm" /> : null}
    </label>
  );
};

export default InputName;
