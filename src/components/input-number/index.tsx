import { useRef, useState } from "react";
import PhoneInput from "react-phone-number-input";
import styles from "./index.module.css";
import { useAppSelector } from "../../services/store/index.types.ts";

const InputNumber = () => {
  const { number } = useAppSelector((state) => state.profile.profileData);
  const { isLoading } = useAppSelector((state) => state.profile);
  const [numberInput, setNumberInput] = useState(number);
  const [isDisabled, setIsDisabled] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);
  const onChangeNumber = (value: string) => {
    setNumberInput(value);
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
  return (
    <label className={styles.label} htmlFor="number">
      Номер телефона
      <PhoneInput
        // @ts-ignore
        ref={inputRef}
        disabled={isDisabled || isLoading}
        className={
          isDisabled
            ? `${styles.inputPhone} ${styles.inputPhone_disabled}`
            : styles.inputPhone
        }
        international
        countryCallingCodeEditable={false}
        defaultCountry="RU"
        value={numberInput}
        onChange={onChangeNumber}
      />
      <button
        className={styles.changeInput}
        onClick={changeInput}
        type="button"
      >
        {isDisabled ? "Изменить" : "Сохранить"}
      </button>
      {isDisabled ? null : (
        <button
          onClick={() => {
            setNumberInput(number);
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

export default InputNumber;
