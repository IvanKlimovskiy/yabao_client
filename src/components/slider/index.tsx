import Carousel from "react-bootstrap/Carousel";
import slide from "../../images/img5.jpg";
import styles from "./index.module.css";
import React from "react";
import { HeaderComponent } from "../header/index.types";

const Slider: React.FC<HeaderComponent> = ({ isFixedHeader }) => {
  return (
    <section
      className={isFixedHeader ? styles["wrapper_fixed"] : styles["wrapper"]}
    >
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
