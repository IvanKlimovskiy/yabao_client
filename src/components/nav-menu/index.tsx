import { FC, useRef } from "react";
import { NavLink } from "react-router-dom";
import styles from "./index.module.css";
import { HeaderComponent } from "../header/index.types";
import {
  useAppDispatch,
  useAppSelector,
} from "../../services/store/index.types.ts";
import { toggleCart } from "../../services/slices/cart";
import Cart from "../cart";
import { open } from "../../services/slices/modal";
import { ModalType } from "../../services/slices/modal/index.types.ts";

const NavMenu: FC<HeaderComponent> = ({ isFixedHeader }) => {
  const ref = useRef(null);
  const { cart, isOpenedCart } = useAppSelector((state) => state.cart);
  const { isAuthorized, profileData } = useAppSelector(
    (state) => state.profile,
  );
  const dispatch = useAppDispatch();

  const onOpen = () => {
    dispatch(toggleCart(true));
  };

  const signup = () => {
    dispatch(open(ModalType.Entering));
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
        {isAuthorized ? (
          <NavLink
            to={"/profile"}
            className={
              isFixedHeader
                ? `${styles.userContainer} ${styles.userContainer_hidden}`
                : styles.userContainer
            }
          >
            <img
              className={styles.userImage}
              src={profileData.img}
              alt={profileData.name}
            />
          </NavLink>
        ) : (
          <button
            onClick={signup}
            type="button"
            className={
              isFixedHeader
                ? `${styles.loginButton} ${styles.loginButton_hidden}`
                : styles.loginButton
            }
          >
            Войти
          </button>
        )}
        <div ref={ref} onClick={onOpen} className={styles.cart}>
          Корзина | {cart.length}
        </div>
        {isOpenedCart ? <Cart navRef={ref} /> : null}
      </div>
    </nav>
  );
};

export default NavMenu;
