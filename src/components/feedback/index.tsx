import styles from "./feedback.module.css";
import { data } from "../../data";

const Feedback = () => {
  // Логика
  const usersFeedback = data.map(({ id, name, image }) => {
    return (
      <li key={id}>
        <a className={styles["feedback__link"]} href="#">
          <figure>
            <div className={styles["feedback__item"]}>
              <img
                className={styles["feedback__image"]}
                src={image}
                alt={name}
              />
            </div>
            <figcaption className={styles["feedback__image-description"]}>
              {name}
            </figcaption>
          </figure>
        </a>
      </li>
    );
  });
  // Вёрстка
  return (
    <section className={styles["feedback"]}>
      <h2 className={styles["feedback__heading"]}>Отывы</h2>
      <ul className={styles["feedback__list"]}>{usersFeedback}</ul>
    </section>
  );
};

export default Feedback;
