// Импорты
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { FreeMode, Pagination } from "swiper/modules";
import styles from "./feedback.module.css";
import { useAppSelector } from "../../services/store/store.types";
// Компонент
const Feedback = () => {
  // Логика
  const { users } = useAppSelector((state) => state.users);
  const usersFeedback = [...users, ...users].map(
    ({ _id, name, img }, index) => (
      <SwiperSlide
        className={styles.slide}
        style={{ display: "flex" }}
        key={`${_id}${index}`}
      >
        <a className={styles.link} href="#">
          <figure>
            <div className={styles.item}>
              <img className={styles.image} src={img} alt={name} />
            </div>
            <figcaption className={styles.imageDescription}>{name}</figcaption>
          </figure>
        </a>
      </SwiperSlide>
    ),
  );
  // Вёрстка
  return (
    <section className={styles.container}>
      <h2 className={styles.title}>Отзывы</h2>
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
