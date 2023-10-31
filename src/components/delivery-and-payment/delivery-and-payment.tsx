import Map from "../map/map.tsx";
import styles from "./delivery-and-payment.module.css";
import shop from "../../images/about-shop.png";
import delivery from "../../images/about-delivery.png";
import speed from "../../images/about-speed.png";
import comp from "../../images/about-comp.png";

const DeliveryAndPayment = () => (
  <section className={styles.container}>
    <div className={styles.wrapper}>
      <h2 className={styles.title}>Оплата и доставка</h2>
      <ul className={styles.list}>
        <li className={styles.item}>
          <div className={styles.itemImageWrapper}>
            <img className={styles.itemImage} src={shop} alt="Компания" />
          </div>
          <p className={styles.itemText}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit
          </p>
        </li>
        <li className={styles.item}>
          <div className={styles.itemImageWrapper}>
            <img className={styles.itemImage} src={delivery} alt="Доставка" />
          </div>
          <p className={styles.itemText}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit
          </p>
        </li>
        <li className={styles.item}>
          <div className={styles.itemImageWrapper}>
            <img className={styles.itemImage} src={comp} alt="Удобство" />
          </div>
          <p className={styles.itemText}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit
          </p>
        </li>
        <li className={styles.item}>
          <div className={styles.itemImageWrapper}>
            <img className={styles.itemImage} src={speed} alt="Скорость" />
          </div>
          <p className={styles.itemText}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit
          </p>
        </li>
      </ul>
      <Map />
    </div>
  </section>
);

export default DeliveryAndPayment;
