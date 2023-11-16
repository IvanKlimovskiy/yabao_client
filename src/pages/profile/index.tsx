import { FC, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  useAppDispatch,
  useAppSelector,
} from "../../services/store/index.types.ts";
import present from "../../images/present.jpg";
import { logout } from "../../utils";
import {
  setIsAuthorized,
  setIsLoggingOut,
} from "../../services/slices/profile";
import "react-phone-number-input/style.css";
import styles from "./index.module.css";
import { ProfilePageType } from "./index.types.ts";
import { ModalType } from "../../services/slices/modal/index.types.ts";
import InfoModal from "../../components/info-modal";
import InputName from "../../components/input-name";
import InputEmail from "../../components/input-email";
import InputNumber from "../../components/input-number";
import InputBirthdate from "../../components/input-birthdate";

const Profile: FC<ProfilePageType> = ({ isFixedHeader }) => {
  const { img, email } = useAppSelector((state) => state.profile.profileData);
  const { isOpenedModal } = useAppSelector((state) => state.modal);
  const [isChecked, setIsChecked] = useState(true);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

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
            <InputName />
            <InputEmail />
            <InputNumber />
            <InputBirthdate />
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
