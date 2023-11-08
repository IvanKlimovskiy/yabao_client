import styles from "./profile.module.css";
import { useAppSelector } from "../../services/store/store.types.ts";
import present from "../../images/present.jpg";
import React, { useState } from "react";
import { generateChangerInputValue, logout } from "../../utils/utils.tsx";
import { NavLink } from "react-router-dom";

const Profile = () => {
  const { number, name, img } = useAppSelector(
    (state) => state.profile.profileData,
  );
  const [numberInputValue, setNumberInputValue] = useState(number);
  const [nameInputValue, setNameInputValue] = useState(name);
  const onChangeNumber = (event: React.ChangeEvent<HTMLInputElement>) => {
    generateChangerInputValue(setNumberInputValue, event.target.value);
  };
  const onChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
    generateChangerInputValue(setNameInputValue, event.target.value);
  };
  const buttonLogoutHandler = () => {
    logout().then(
      (data: { status: "success" | "failure"; message: string }) => {
        const { status } = data;
        if (status === "success") {
          localStorage.removeItem("refreshToken");
        }
      },
    );
  };
  return (
    <section className={styles.container}>
      <h2 className={styles.title}>Мои бонусы</h2>
      <div>
        <img src={present} alt="Подарок" />
        <p>Бонусы появятся здесь после заказа</p>
      </div>
      <div>
        <a href="">Все наши акции</a>
      </div>
      <h2>Личные данные</h2>
      <div>Фото профиля</div>
      <img className={styles.avatar} src={img} alt="Фото профиля" />
      <form>
        <label htmlFor="name">Имя</label>
        <input
          disabled
          id={"name"}
          name={"name"}
          type="text"
          value={nameInputValue}
          onChange={onChangeName}
        />
        <label htmlFor="number">Номер телефона</label>
        <input
          disabled
          id={"number"}
          name={"number"}
          type="text"
          value={numberInputValue}
          onChange={onChangeNumber}
        />
        <label htmlFor="date">Дата рождения</label>
        <input id={"date"} name={"date"} type="date" />
      </form>
      <h2>Подписки</h2>
      <form>
        <label htmlFor="subscribeToNotifications">
          Сообщать о бонусах, акциях и новых продуктах
        </label>
        <input
          id={"subscribeToNotifications"}
          name={"subscribeToNotifications"}
          type="checkbox"
        />
      </form>
      <button type="button" onClick={buttonLogoutHandler}>
        <NavLink to={"/"}>Выйти</NavLink>
      </button>
    </section>
  );
};

export default Profile;
