import { useAppSelector } from "../../services/store/store.types";
import styles from "./cart.module.css";

const CartPreview = () => {
  const { menu } = useAppSelector((state) => state.menu);
  const pizzaData = menu[0];
  return (
    pizzaData && (
      <div className={styles.container}>
        <ul className={styles.list}>
          <li className={styles.item}>
            <img
              className={styles.itemImage}
              src={menu[0].pizzas[0].img}
              alt={menu[0].pizzas[0].name}
            />
            <div className={styles.itemBody}>
              <div className={styles.itemTop}>
                <h3 className={styles.itemTitle}></h3>
                <button className={styles.trashButton}></button>
              </div>
              <div className={styles.itemBottom}>
                <div className={styles.itemButtons}>
                  <button className={styles.buttonIncrease}>-</button>
                  <div className={styles.itemCounter}>5</div>
                  <button className={styles.itemDecrease}>-</button>
                </div>
                <div className={styles.itemTotal}>120 ₽</div>
              </div>
            </div>
          </li>
        </ul>
        <div className={styles.footer}>
          <div className={styles.footerContainer}>
            <h3 className={styles.total}>Сумма заказа</h3>
            <p className={styles.price}>120 ₽</p>
          </div>
          <div className={styles.addToOrder}>Добавить к заказу?</div>
          <ul className={styles.extraList}>
            <li className={styles.extraItem}>
              <img
                className={styles.extraItemImage}
                src={menu[0].pizzas[0].img}
                alt={menu[0].pizzas[0].name}
              />
              <div className={styles.extraItemBody}>
                <h3 className={styles.extraItemTitle}></h3>
                <div className={styles.extraItemText}>ot 120 r</div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    )
  );
};

export default CartPreview;
