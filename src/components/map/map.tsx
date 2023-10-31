import styles from "./map.module.css";

const Map = () => (
  <iframe
    className={styles.wrapper}
    src="https://yandex.ru/map-widget/v1/?um=constructor%3A233072450e5c349abf700c24936b284a54efd2a18e40414a7d0b872ddf1d1b27&amp;source=constructor"
  ></iframe>
);

export default Map;
