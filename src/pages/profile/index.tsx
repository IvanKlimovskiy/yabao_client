import React, { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import PhoneInput from "react-phone-number-input";
import {
  useAppDispatch,
  useAppSelector,
} from "../../services/store/index.types.ts";
import present from "../../images/present.jpg";
import { generateChangerInputValue, logout } from "../../utils/index.tsx";
import {
  setIsAuthorized,
  setIsLoggingOut,
} from "../../services/slices/profile/index.ts";
import "react-phone-number-input/style.css";
import styles from "./index.module.css";
import { ProfilePageType } from "./index.types.ts";

const Profile: React.FC<ProfilePageType> = ({ isFixedHeader }) => {
  const { number, name, img } = useAppSelector(
    (state) => state.profile.profileData,
  );
  const [numberInputValue, setNumberInputValue] = useState(number);
  const [nameInputValue, setNameInputValue] = useState(name);
  const [isDisabledInput, setIsDisabledInput] = useState(true);
  const [isChecked, setIsChecked] = useState(true);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const onChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
    generateChangerInputValue(setNameInputValue, event.target.value);
  };
  const buttonLogoutHandler = () => {
    dispatch(setIsLoggingOut(true));
    logout()
      .then((data: { status: "success" | "failure"; message: string }) => {
        const { status } = data;
        if (status === "success") {
          dispatch(setIsAuthorized(false));
          localStorage.removeItem("refreshToken");
        }
      })
      .catch((e) => {
        console.log(e);
      })
      .finally(() => {
        navigate("/");
        dispatch(setIsLoggingOut(false));
      });
  };
  const handleChange = (newValue: string) => {
    setNumberInputValue(newValue);
  };
  const disableInputs = () => {
    setIsDisabledInput(true);
  };
  const enableInputs = () => {
    setIsDisabledInput(false);
  };
  const fetchNewInputs = () => {
    setIsDisabledInput(true);
  };
  const toggleCheckbox = () => {
    setIsChecked((prevState) => !prevState);
  };
  return (
    <section
      className={
        isFixedHeader
          ? `${styles.container} ${styles.container_type_fixed}`
          : styles.container
      }
    >
      <div className={styles.containerTop}>
        <div className={styles.containerTopContent}>
          <h2 className={styles.title}>Мои бонусы</h2>
          <div className={styles.imageContainer}>
            <img className={styles.image} src={present} alt="Подарок" />
            <p className={styles.text}>Бонусы появятся здесь после заказа</p>
          </div>
          <NavLink to="/" className={styles.link}>
            Все наши акции
          </NavLink>
        </div>
      </div>
      <div className={styles.personalDataContainer}>
        <h2 className={styles.personalDataTitle}>Личные данные</h2>
        <h3 className={styles.avatarTitle}>Фото профиля</h3>
        <div className={styles.avatarContainer}>
          <img className={styles.avatar} src={img} alt="Фото профиля" />
        </div>
        <button className={styles.btn} type="button">
          Изменить фото
        </button>
        <form className={styles.form}>
          <label className={styles.label} htmlFor="name">
            Имя
          </label>
          <input
            className={styles.input}
            disabled={isDisabledInput}
            id={"name"}
            name={"name"}
            type="text"
            value={nameInputValue}
            onChange={onChangeName}
          />
          <label className={styles.label} htmlFor="number">
            Номер телефона
          </label>
          <PhoneInput
            disabled={isDisabledInput}
            className={
              isDisabledInput
                ? `${styles.inputPhone} ${styles.inputPhone_disabled}`
                : styles.inputPhone
            }
            international
            countryCallingCodeEditable={false}
            defaultCountry="RU"
            value={numberInputValue}
            onChange={handleChange}
          />
          <label className={styles.label} htmlFor="date">
            Дата рождения
          </label>
          <input className={styles.input} id="date" name="date" type="date" />
          <div className={styles.buttons}>
            {isDisabledInput ? (
              <button
                onClick={enableInputs}
                className={styles.btn}
                type="button"
              >
                Изменить
              </button>
            ) : (
              <>
                <button
                  onClick={fetchNewInputs}
                  className={styles.btn}
                  type="button"
                >
                  Сохранить
                </button>
                <button
                  onClick={disableInputs}
                  className={`${styles.btn} ${styles.btn_margin_left}`}
                  type="button"
                >
                  Отмена
                </button>
              </>
            )}
          </div>
        </form>
      </div>
      <div className={styles.subscribesContainer}>
        <h2 className={styles.subscribesTitle}>Подписки</h2>
        <form className={`${styles.form} ${styles.form_type_checkbox}`}>
          <div className={styles.checkboxContainer}>
            <label
              className={`${styles.label} ${styles.label_type_checkbox}`}
              htmlFor="subscribeToNotifications"
            >
              <input
                onChange={toggleCheckbox}
                checked={isChecked}
                className={`${styles.input} ${styles.input_type_checkbox}`}
                id={"subscribeToNotifications"}
                name={"subscribeToNotifications"}
                type="checkbox"
              />
              <span className={styles.customCheckbox}>
                <span
                  className={
                    isChecked
                      ? styles.customCheckboxChecked
                      : styles.customCheckboxNotChecked
                  }
                ></span>
              </span>
              Сообщать о бонусах, акциях и новых продуктах
            </label>
          </div>
        </form>
      </div>
      <div className={styles.logoutButtonContainer}>
        <button
          className={styles.btn}
          type="button"
          onClick={buttonLogoutHandler}
        >
          Выйти
        </button>
      </div>
    </section>
  );
};

export default Profile;
