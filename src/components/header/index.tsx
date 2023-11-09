import { FC } from "react";
import { NavLink } from "react-router-dom";
import logo from "../../images/logo.svg";
import styles from "./index.module.css";
import NavMenu from "../nav-menu";
import { HeaderComponent } from "./index.types.ts";

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
