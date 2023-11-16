import React, { useRef, useState } from "react";
import styles from "../input-name/index.module.css";
import {
  useAppDispatch,
  useAppSelector,
} from "../../services/store/index.types.ts";
import { setIsLoading, setProfileData } from "../../services/slices/profile";
import api from "../../http/api.ts";
import { ProfileDataType } from "../../services/slices/profile/index.types.ts";

const InputBirthdate = () => {
  const dispatch = useAppDispatch();
  const { _id, birthdate } = useAppSelector(
    (state) => state.profile.profileData,
  );
  const { isLoading } = useAppSelector((state) => state.profile);
  const [birthdateInput, setBirthdateInput] = useState(birthdate);
  const [isDisabled, setIsDisabled] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);
  const onChangeBirthdate = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBirthdateInput(event.target.value);
  };
  const changeInputHandler = () => {
    if (!isDisabled) {
      dispatch(setIsLoading(true));
      api
        .patch<{ status: string; user: ProfileDataType }>(
          `/users/${_id}/birthdate`,
          { birthdate: birthdateInput },
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
    <label className={styles.label} htmlFor="date">
      Дата рождения
      <input
        onChange={onChangeBirthdate}
        disabled={isDisabled || isLoading}
        className={styles.input}
        id="date"
        name="date"
        type="date"
        value={birthdateInput}
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
            setBirthdateInput(birthdate);
            setIsDisabled(true);
          }}
          type="button"
          className={styles.cancel}
        >
          Отменить
        </button>
      )}
    </label>
  );
};

export default InputBirthdate;
