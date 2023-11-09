import { FC } from "react";
import Carousel from "react-bootstrap/Carousel";
import slide from "../../images/img5.jpg";
import styles from "./index.module.css";
import { HeaderComponent } from "../header/index.types";

const Slider: FC<HeaderComponent> = ({ isFixedHeader }) => (
  <section className={isFixedHeader ? styles.containerFixed : styles.container}>
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

export default Slider;
