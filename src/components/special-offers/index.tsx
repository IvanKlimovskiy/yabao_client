import styles from "./index.module.css";
import offer from "../../images/special.jpg";

const SpecialOffers = () => (
  <section className={styles.container}>
    <h2 className={styles.title}>
      <span>Наши</span> <span style={{ color: "#FF2E65" }}>акции</span>
    </h2>
    <ul className={styles.list}>
      <li style={{ gridRow: "1/3", gridColumn: "1/3" }} className={styles.item}>
        <img className={styles.image} src={offer} alt={"Акция"} />
      </li>
      <li style={{ gridRow: "1", gridColumn: "3" }} className={styles.item}>
        <img className={styles.image} src={offer} alt={"Акция"} />
      </li>
      <li style={{ gridRow: "1", gridColumn: "4" }} className={styles.item}>
        <img className={styles.image} src={offer} alt={"Акция"} />
      </li>
      <li style={{ gridRow: "2", gridColumn: "3" }} className={styles.item}>
        <img className={styles.image} src={offer} alt={"Акция"} />
      </li>
      <li style={{ gridRow: "2", gridColumn: "4" }} className={styles.item}>
        <img className={styles.image} src={offer} alt={"Акция"} />
      </li>
    </ul>
    <button className={styles.button} type="button">
      Все вкции
    </button>
  </section>
);

export default SpecialOffers;
