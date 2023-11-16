import React, { useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import PhoneInput from "react-phone-number-input";
import { Spinner } from "react-bootstrap";
import {
  useAppDispatch,
  useAppSelector,
} from "../../services/store/index.types.ts";
import present from "../../images/present.jpg";
import { logout } from "../../utils";
import {
  setIsAuthorized,
  setIsLoading,
  setIsLoggingOut,
  setProfileData,
} from "../../services/slices/profile";
import "react-phone-number-input/style.css";
import styles from "./index.module.css";
import { Inputs, ProfilePageType } from "./index.types.ts";
import Tooltip from "../../components/tooltip";
import { closeModal, openModal } from "../../services/slices/modal";
import { ModalType } from "../../services/slices/modal/index.types.ts";
import InfoModal from "../../components/info-modal";
import api from "../../http/api.ts";
import { ProfileDataType } from "../../services/slices/profile/index.types.ts";

const Profile: React.FC<ProfilePageType> = ({ isFixedHeader }) => {
  const { _id, number, name, img, email, birthdate, isActivated } =
    useAppSelector((state) => state.profile.profileData);
  const { isLoading } = useAppSelector((state) => state.profile);
  const { isOpenedModal } = useAppSelector((state) => state.modal);
  const [isChecked, setIsChecked] = useState(true);
  const [inputs, setInputs] = useState<Inputs>({
    name: {
      value: name,
      isDisabled: true,
    },
    email: {
      value: email,
      isDisabled: true,
    },
    number: {
      value: number,
      isDisabled: true,
    },
    birthdate: {
      value: birthdate,
      isDisabled: true,
    },
  });
  const handleChange = (inputName: keyof Inputs, value: string) => {
    setInputs((prevInputs) => ({
      ...prevInputs,
      [inputName]: {
        ...prevInputs[inputName],
        value,
      },
    }));
  };
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const onChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleChange("name", event.target.value);
  };
  const onChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleChange("email", event.target.value);
  };
  const onChangeBirthdate = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleChange("email", event.target.value);
  };
  const onChangeNumber = (value: string) => {
    handleChange("number", value);
  };
  const changeInput = (inputName: keyof Inputs) => {
    setInputs((prevInputs) => ({
      ...prevInputs,
      [inputName]: {
        ...prevInputs[inputName],
        isDisabled: false,
      },
    }));
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, 0);
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
  const toggleCheckbox = () => {
    setIsChecked((prevState) => !prevState);
  };
  const cancelButton = (inputName: keyof Inputs) =>
    inputs[inputName].isDisabled ? null : (
      <button
        onClick={() => {
          setInputs((prevInputs) => ({
            ...prevInputs,
            [inputName]: {
              ...prevInputs[inputName],
              isDisabled: true,
            },
          }));
        }}
        type="button"
        className={
          inputName === "email"
            ? `${styles.cancel} ${styles.cancel_type_email}`
            : styles.cancel
        }
      >
        Отменить
      </button>
    );
  const buttonName = (inputName: keyof Inputs) =>
    inputs[inputName].isDisabled ? "Изменить" : "Сохранить";
  const verifyEmail = () => {
    if (inputs.email.value === "example@email.com") {
      return dispatch(openModal(ModalType.Error));
    }
    dispatch(openModal(ModalType.Accept));
    return api
      .post("/auth/activate/email", {
        email: inputs.email.value,
        number: inputs.number.value,
      })
      .then(() => {
        dispatch(closeModal());
      });
  };
  const changeInputHandler = (inputName: keyof Inputs) => {
    if (!inputs[inputName].isDisabled) {
      dispatch(setIsLoading(true));
      api
        .patch<{ status: string; user: ProfileDataType }>(
          `/users/${_id}/name`,
          { name: inputs.name.value },
        )
        .then((response) => {
          const { user } = response.data;
          dispatch(setProfileData(user));
        })
        .catch((err) => console.log(err))
        .finally(() => {
          dispatch(setIsLoading(false));
        });
      setInputs((prevInputs) => ({
        ...prevInputs,
        [inputName]: {
          ...prevInputs[inputName],
          isDisabled: true,
        },
      }));
    } else {
      setInputs((prevInputs) => ({
        ...prevInputs,
        [inputName]: {
          ...prevInputs[inputName],
          isDisabled: false,
        },
      }));
      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.focus();
        }
      }, 0);
    }
  };
  return (
    <>
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
              <input
                ref={inputRef}
                className={styles.input}
                disabled={inputs.name.isDisabled || isLoading}
                id="name"
                name="name"
                type="text"
                value={inputs.name.value}
                onChange={onChangeName}
              />
              <button
                className={styles.changeInput}
                onClick={() => changeInputHandler("name")}
                type="button"
              >
                {buttonName("name")}
              </button>
              {cancelButton("name")}
              {isLoading ? <Spinner size="sm" /> : null}
            </label>
            <label className={styles.label} htmlFor="name">
              Почта
              <input
                disabled={inputs.email.isDisabled || isLoading}
                className={
                  isActivated
                    ? styles.input
                    : `${styles.input} ${styles.input_notActivated}`
                }
                id="email"
                name="email"
                type="text"
                value={inputs.email.value}
                onChange={onChangeEmail}
              />
              <button
                className={
                  isActivated
                    ? styles.changeInput
                    : `${styles.changeInput} ${styles.changeInput_type_email}`
                }
                onClick={() => changeInput("email")}
                type="button"
              >
                {buttonName("email")}
              </button>
              {cancelButton("email")}
              {!isActivated ? (
                <Tooltip>
                  <span onClick={verifyEmail} className={styles.warning}>
                    Подтвердите Вашу почту
                  </span>
                </Tooltip>
              ) : null}
            </label>
            <label className={styles.label} htmlFor="number">
              Номер телефона
              <PhoneInput
                disabled={inputs.number.isDisabled || isLoading}
                className={
                  inputs.number.isDisabled
                    ? `${styles.inputPhone} ${styles.inputPhone_disabled}`
                    : styles.inputPhone
                }
                international
                countryCallingCodeEditable={false}
                defaultCountry="RU"
                value={inputs.number.value}
                onChange={onChangeNumber}
              />
              <button
                className={styles.changeInput}
                onClick={() => changeInput("number")}
                type="button"
              >
                {buttonName("number")}
              </button>
              {cancelButton("number")}
            </label>
            <label className={styles.label} htmlFor="date">
              Дата рождения
              <input
                onChange={onChangeBirthdate}
                disabled={inputs.birthdate.isDisabled || isLoading}
                className={styles.input}
                id="date"
                name="date"
                type="date"
                value={inputs.birthdate.value}
              />
              <button
                className={styles.changeInput}
                onClick={() => changeInput("birthdate")}
                type="button"
              >
                {buttonName("birthdate")}
              </button>
              {cancelButton("birthdate")}
            </label>
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
      {isOpenedModal && (
        <InfoModal title={"Почта указана верно?"} typeModal={ModalType.Accept}>
          {email}
        </InfoModal>
      )}
      {isOpenedModal && (
        <InfoModal title={"Предупреждение"} typeModal={ModalType.Error}>
          Введите корректный E-mail
        </InfoModal>
      )}
    </>
  );
};

export default Profile;
