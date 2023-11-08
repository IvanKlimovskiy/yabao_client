import img from "../../images/error_img.png";
import styles from "./error-page.module.css";

const ErrorPage = () => (
  <section className={styles.container}>
    <h2 className={styles.title}>Ой, что-то пошло не так!</h2>
    <img className={styles.image} src={img} alt={"Ошибка"} />
  </section>
);

export default ErrorPage;
