import { FC } from "react";
import styles from "./index.module.css";
import { CartElementComponent } from "./index.types";
import { useAppDispatch } from "../../services/store/index.types";
import {
  increaseAmount,
  removeFromCart,
  decreaseAmount,
} from "../../services/slices/cart";

const CartElement: FC<CartElementComponent> = ({ element }) => {
  const dispatch = useAppDispatch();
  const { _id, name, img, price, amount } = element;

  const increaseButtonHandler = () => {
    dispatch(increaseAmount(_id));
  };

  const decreaseButtonHandler = () => {
    setTimeout(() => {
      dispatch(decreaseAmount(_id));
    }, 0);
  };

  const buttonHandler = () => {
    setTimeout(() => {
      dispatch(removeFromCart(element));
    }, 0);
  };

  return (
    <li className={styles.item}>
      <img className={styles.itemImage} src={img} alt={name} />
      <div className={styles.itemBody}>
        <div className={styles.itemTop}>
          <h3 className={styles.itemTitle}>{name}</h3>
          <button
            onClick={buttonHandler}
            type="button"
            className={styles.trashButton}
          ></button>
        </div>
        <div className={styles.itemBottom}>
          <div className={styles.itemButtons}>
            <button
              onClick={decreaseButtonHandler}
              type="button"
              className={`${styles.buttonDecrease} ${styles.button}`}
            ></button>
            <div className={styles.itemCounter}>{amount}</div>
            <button
              onClick={increaseButtonHandler}
              type="button"
              className={`${styles.buttonIncrease} ${styles.button}`}
            ></button>
          </div>
          <div className={styles.itemTotal}>{price * amount} ₽</div>
        </div>
      </div>
    </li>
  );
};

export default CartElement;