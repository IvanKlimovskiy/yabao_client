import { useAppSelector } from "../../services/store/index.types";
import styles from "./index.module.css";

const CartPreview = () => {
  const { menu } = useAppSelector((state) => state.menu);
  const pizzaData = menu[0];
  return (
    pizzaData && (
      <div className={styles["cart"]}>
        <ul className={styles["cart__list"]}>
          <li className={styles["cart__item"]}>
            <img
              className={styles["cart__item-image"]}
              src={menu[0].pizzas[0].img}
              alt={menu[0].pizzas[0].name}
            />
            <div className={styles["cart__item-body"]}>
              <div className={styles["cart__item-top"]}>
                <h3 className={styles["cart__item-title"]}></h3>
                <button className={styles["cart__trash-button"]}></button>
              </div>
              <div className={styles["cart__item-bottom"]}>
                <div className={styles["cart__item-buttons"]}>
                  <button className={styles["cart__button-increase"]}>-</button>
                  <div className={styles["cart__item-counter"]}>5</div>
                  <button className={styles["cart__item-decrease"]}>-</button>
                </div>
                <div className={styles["cart__item-total"]}>120 ₽</div>
              </div>
            </div>
          </li>
        </ul>
        <div className={styles["cart__footer"]}>
          <div className={styles["cart__footer-container"]}>
            <h3 className={styles["cart__total"]}>Сумма заказа</h3>
            <p className={styles["cart__price"]}>120 ₽</p>
          </div>
          <div className={styles["cart__add-to-order"]}>Добавить к заказу?</div>
          <ul className={styles["cart__extra-list"]}>
            <li className={styles["cart__extra-item"]}>
              <img
                className={styles["cart__extra-item-image"]}
                src={menu[0].pizzas[0].img}
                alt={menu[0].pizzas[0].name}
              />
              <div className={styles["cart__extra-item-body"]}>
                <h3 className={styles["cart__extra-item-title"]}></h3>
                <div className={styles["cart__extra-item-text"]}>ot 120 r</div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    )
  );
};

export default CartPreview;
