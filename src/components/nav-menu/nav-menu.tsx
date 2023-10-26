import React from "react";
import styles from "./nav-menu.module.css";
import { HeaderComponent } from "../header/header.types";
import { useAppSelector } from "../../services/store/store.types";
import CartPreview from "../cart/cart.tsx";

const NavMenu: React.FC<HeaderComponent> = ({ isFixedHeader }) => {
  const { addedToCart } = useAppSelector((state) => state.cart);

  return (
    <nav
      className={
        isFixedHeader
          ? `${styles.container} ${styles.fixedHeader}`
          : `${styles.container}`
      }
    >
      <ul
        className={
          isFixedHeader
            ? styles.list
            : `${styles.list} ${styles.list_animation_appear}`
        }
      >
        <li className={styles.item}>
          <a className={styles.itemLink} href="#">
            Паста
          </a>
        </li>
        <li className={styles.item}>
          <a className={styles.itemLink} href="#">
            Супы
          </a>
        </li>
        <li className={styles.item}>
          <a className={styles.itemLink} href="#">
            Антипасти
          </a>
        </li>
        <li className={styles.item}>
          <a className={styles.itemLink} href="#">
            Напитки
          </a>
        </li>
        <li className={styles.item}>
          <a className={styles.itemLink} href="#">
            Десерты
          </a>
        </li>
        <li className={styles.item}>
          <a className={styles.itemLink} href="#">
            Бакалея
          </a>
        </li>
        <li className={styles.item}>
          <a className={styles.itemLink} href="#">
            Акции
          </a>
        </li>
        <li className={styles.item}>
          <a className={styles.itemLink} href="#">
            Комбо
          </a>
        </li>
        <li className={styles.item}>
          <a className={styles.itemLink} href="#">
            Контакты
          </a>
        </li>
      </ul>
      <div className={isFixedHeader ? styles.buttons_fixed : styles.buttons}>
        <button
          className={
            isFixedHeader
              ? `${styles.loginButton} ${styles.loginButton_hidden}`
              : styles.loginButton
          }
        >
          Войти
        </button>
        <button className={styles.cart}>
          <div>Корзина</div>
          <div style={{ width: 21 }}>{addedToCart.length}</div>
          <CartPreview />
        </button>
      </div>
    </nav>
  );
};

export default NavMenu;
