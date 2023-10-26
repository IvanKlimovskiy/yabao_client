// Импорты
import styles from "./index.module.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { FreeMode, Pagination } from "swiper/modules";
import { useAppSelector } from "../../services/store/index.types";
// Компонент
const Feedback = () => {
  // Логика
  const { users } = useAppSelector((state) => state.users);
  const usersFeedback = [...users, ...users].map(
    ({ _id, name, img }, index) => {
      return (
        <SwiperSlide
          className={styles["feedback_slide"]}
          style={{ display: "flex" }}
          key={`${_id}${index}`}
        >
          <a className={styles["feedback__link"]} href="#">
            <figure>
              <div className={styles["feedback__item"]}>
                <img
                  className={styles["feedback__image"]}
                  src={img}
                  alt={name}
                />
              </div>
              <figcaption className={styles["feedback__image-description"]}>
                {name}
              </figcaption>
            </figure>
          </a>
        </SwiperSlide>
      );
    },
  );
  // Вёрстка
  return (
    <section className={styles["feedback"]}>
      <h2 className={styles["feedback__heading"]}>Отзывы</h2>
      <Swiper
        slidesPerView={8}
        spaceBetween={45}
        freeMode={true}
        pagination={{
          clickable: true,
        }}
        modules={[FreeMode, Pagination]}
      >
        {usersFeedback}
      </Swiper>
    </section>
  );
};
// Экспорт
export default Feedback;
