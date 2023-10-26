import img from "../../../images/error_img.png";
import styles from "./index.module.css";

const ErrorPage = () => {
  return (
    <section className={styles["error"]}>
      <h2 className={styles["error__title"]}>Ой, что-то пошло не так!</h2>
      <img className={styles["error__image"]} src={img} alt={"Ошибка"} />
    </section>
  );
};

export default ErrorPage;
