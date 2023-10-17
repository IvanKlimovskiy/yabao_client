import styles from "./nav-menu.module.css";
const NavMenu = () => {
  return (
    <nav className={styles["nav-menu"]}>
      <ul className={styles["nav-menu__list"]}>
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
        <li className={styles["nav-menu__list-item"]}>
          <a className={styles["nav-menu__list-item-link"]} href="#">
            Паста
          </a>
        </li>
      </ul>
      <div className={styles["nav-menu__wrapper-buttons"]}>
        <button className={styles["nav-menu__login-button"]}>Войти</button>
        <button className={styles["nav-menu__cart-button"]}>Корзина | 1</button>
      </div>
    </nav>
  );
};

export default NavMenu;
