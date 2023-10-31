import { FC, useRef } from "react";
import styles from "./nav-menu.module.css";
import { HeaderComponent } from "../header/header.types";
import {
  useAppDispatch,
  useAppSelector,
} from "../../services/store/store.types";
import Cart from "../cart/cart.tsx";
import { toggleCart } from "../../services/slices/cart/cart";

const NavMenu: FC<HeaderComponent> = ({ isFixedHeader }) => {
  const ref = useRef(null);
  const { cart } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();

  const onOpen = () => {
    dispatch(toggleCart(true));
  };

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
          type="button"
          className={
            isFixedHeader
              ? `${styles.loginButton} ${styles.loginButton_hidden}`
              : styles.loginButton
          }
        >
          Войти
        </button>
        <div ref={ref} onClick={onOpen} className={styles.cart}>
          Корзина | {cart.length}
        </div>
        <Cart navRef={ref} />
      </div>
    </nav>
  );
};

export default NavMenu;
