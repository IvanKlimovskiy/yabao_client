import logo from "../../images/logo.svg";
import styles from "../header/header.module.css";
import NavMenu from "../nav-menu";
const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles["header__wrapper"]}>
        <div className={styles["header__wrapper-logo-and-info"]}>
          <img src={logo} alt="Логотип" />
          <h1 className={styles["header__heading"]}>
            Доставка пиццы в Санкт-Петербурге
          </h1>
        </div>
        <div className={styles["header__wrapper-phone-and-button"]}>
          <button className={styles["header__button-call"]}>
            Заказать звонок
          </button>
          <div className={styles["header__phone-number"]}>8 800 333-36-62</div>
        </div>
      </div>
      <NavMenu />
    </header>
  );
};

export default Header;
