import {
  logo,
  visa,
  paypal,
  mastercard,
  viber,
  skype,
  messenger,
  telegram,
  facebook,
  vk,
} from "../../images/images";
import styles from "./footer.module.css";

const Footer = () => (
  <footer className={styles.container}>
    <div className={styles.legalInfo}>
      <div className={styles.logoWrapper}>
        <img className={styles.logo} src={logo} alt="Логотип" />
      </div>
      <nav className={styles.info}>
        <ul className={styles.infoList}>
          <li className={styles.infoItem}>
            <a href="">Калорийность и состав</a>
          </li>
          <li className={styles.infoItem}>
            <a href="">Правовая информация</a>
          </li>
          <li style={{ gridColumn: "span 2" }}>
            <span className={styles.socialsTitle}>Мы в соцсетях</span>
            <ul className={styles.socials}>
              <li className={styles.social}>
                <a href="">YouTube</a>
              </li>
              <li className={styles.social}>
                <a href="">Instagram</a>
              </li>
              <li className={styles.social}>
                <a href="">Facebook</a>
              </li>
              <li className={styles.social}>
                <a href="">ВКонтакте</a>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
      <div className={styles.infoBottom}>
        <div className={styles.copyright}>YaBao Все праав защищены © 2021</div>
        <div className={styles.payments}>
          <img className={styles.payment} src={visa} alt="Visa" />
          <img className={styles.payment} src={paypal} alt="PayPal" />
          <img className={styles.payment} src={mastercard} alt="Mastercard" />
        </div>
      </div>
    </div>
    <div className={styles.contacts}>
      <h3 className={styles.contactsTitle}>
        Остались вопросы? А мы всегда на связи:
      </h3>
      <ul className={styles.contactsList}>
        <li className={styles.contactsItem}>
          <a href="">
            <img src={viber} alt="" />
          </a>
        </li>
        <li className={styles.contactsItem}>
          <a href="">
            <img src={skype} alt="" />
          </a>
        </li>
        <li className={styles.contactsItem}>
          <a href="">
            <img src={messenger} alt="" />
          </a>
        </li>
        <li className={styles.contactsItem}>
          <a href="">
            <img src={telegram} alt="" />
          </a>
        </li>
        <li className={styles.contactsItem}>
          <a href="">
            <img src={facebook} alt="" />
          </a>
        </li>
        <li className={styles.contactsItem}>
          <a href="">
            <img src={vk} alt="" />
          </a>
        </li>
        <li style={{ gridColumn: "3/5" }} className={styles.contactsItem}>
          Написать нам
        </li>
      </ul>
      <div className={styles.phone}>8 800 333-36-62</div>
      <button className={styles.callBack} type="button">
        Заказать звонок
      </button>
    </div>
  </footer>
);

export default Footer;
