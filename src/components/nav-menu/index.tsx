import styles from "./index.module.css";
import React from "react";
import { HeaderComponent } from "../header/index.types";
import { useAppSelector } from "../../services/store/index.types";
import CartPreview from "../cart-preview";

const NavMenu: React.FC<HeaderComponent> = ({ isFixedHeader }) => {
  const { addedToCart } = useAppSelector((state) => state.cart);

  return (
    <nav
      className={
        isFixedHeader
          ? `${styles["nav-menu"]} ${styles["nav-menu_fixed-header"]}`
          : `${styles["nav-menu"]}`
      }
    >
      <ul
        className={
          isFixedHeader
            ? styles["nav-menu__list"]
            : `${styles["nav-menu__list"]} ${styles["nav-menu__list_animation_appear"]}`
        }
      >
        <li className={styles["nav-menu__list-item"]}>
          <a className={styles["nav-menu__list-item-link"]} href="#">
            Паста
          </a>
        </li>
        <li className={styles["nav-menu__list-item"]}>
          <a className={styles["nav-menu__list-item-link"]} href="#">
            Супы
          </a>
        </li>
        <li className={styles["nav-menu__list-item"]}>
          <a className={styles["nav-menu__list-item-link"]} href="#">
            Антипасти
          </a>
        </li>
        <li className={styles["nav-menu__list-item"]}>
          <a className={styles["nav-menu__list-item-link"]} href="#">
            Напитки
          </a>
        </li>
        <li className={styles["nav-menu__list-item"]}>
          <a className={styles["nav-menu__list-item-link"]} href="#">
            Десерты
          </a>
        </li>
        <li className={styles["nav-menu__list-item"]}>
          <a className={styles["nav-menu__list-item-link"]} href="#">
            Бакалея
          </a>
        </li>
        <li className={styles["nav-menu__list-item"]}>
          <a className={styles["nav-menu__list-item-link"]} href="#">
            Акции
          </a>
        </li>
        <li className={styles["nav-menu__list-item"]}>
          <a className={styles["nav-menu__list-item-link"]} href="#">
            Комбо
          </a>
        </li>
        <li className={styles["nav-menu__list-item"]}>
          <a className={styles["nav-menu__list-item-link"]} href="#">
            Контакты
          </a>
        </li>
      </ul>
      <div
        className={
          isFixedHeader
            ? styles["nav-menu__wrapper-buttons_fixed"]
            : styles["nav-menu__wrapper-buttons"]
        }
      >
        <button
          className={
            isFixedHeader
              ? `${styles["nav-menu__login-button"]} ${styles["nav-menu__login-button_hidden"]}`
              : styles["nav-menu__login-button"]
          }
        >
          Войти
        </button>
        <button className={styles["nav-menu__cart-button"]}>
          <div>Корзина</div> |{" "}
          <div style={{ width: 21 }}>{addedToCart.length}</div>
          <CartPreview />
        </button>
      </div>
    </nav>
  );
};

export default NavMenu;
