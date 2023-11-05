import { FC } from "react";
import logo from "../../images/logo.svg";
import styles from "./header.module.css";
import NavMenu from "../nav-menu/nav-menu.tsx";
import { HeaderComponent } from "./header.types";
import { NavLink } from "react-router-dom";

const Header: FC<HeaderComponent> = ({ isFixedHeader }) => (
  <header className={isFixedHeader ? `${styles.fixed}` : `${styles.container}`}>
    <div className={styles.wrapper}>
      <div className={styles.top}>
        <NavLink to={"/"}>
          <img src={logo} alt="Логотип" />
        </NavLink>
        <h1 className={styles.title}>Доставка пиццы в Санкт-Петербурге</h1>
      </div>
      <div className={styles.bottom}>
        <button className={styles.button}>Заказать звонок</button>
        <div className={styles.phone}>8 800 333-36-62</div>
      </div>
    </div>
    <NavMenu isFixedHeader={isFixedHeader} />
  </header>
);

export default Header;
