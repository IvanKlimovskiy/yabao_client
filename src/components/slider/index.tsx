import Carousel from "react-bootstrap/Carousel";
import slide from "../../images/img5.jpg";
import styles from "./slider.module.css";

const Slider = () => {
  return (
    <section className={styles.wrapper}>
      <Carousel controls={false} indicators={false} interval={5000}>
        <Carousel.Item>
          <img src={slide} alt="Превью" />
        </Carousel.Item>
        <Carousel.Item>
          <img src={slide} alt="Превью" />
        </Carousel.Item>
        <Carousel.Item>
          <img src={slide} alt="Превью" />
        </Carousel.Item>
      </Carousel>
    </section>
  );
};

export default Slider;
