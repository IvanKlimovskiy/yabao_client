import { CloseButton } from "react-bootstrap";
import {
  useAppDispatch,
  useAppSelector,
} from "../../services/store/store.types";
import styles from "./cart.module.css";
import CartElement from "../cart-element/cart-element.tsx";
import { toggleCart } from "../../services/slices/cart/cart";

const Cart = () => {
  const { menu } = useAppSelector((state) => state.menu);
  const { cart, total, isOpenedCart } = useAppSelector((state) => state.cart);
  const drinkData = menu[3];
  const dispatch = useAppDispatch();

  const onClose = () => {
    dispatch(toggleCart(false));
  };

  const order = cart.map((element) => (
    <CartElement key={element._id} element={element} />
  ));

  const extra = drinkData
    ? drinkData.drinks.map(({ _id, name, img, price }) => (
        <li key={_id} className={styles.extraItem}>
          <img className={styles.extraItemImage} src={img} alt={name} />
          <div className={styles.extraItemBody}>
            <h3 className={styles.extraItemTitle}>{name}</h3>
            <div className={styles.extraItemText}>от {price} ₽</div>
          </div>
        </li>
      ))
    : null;

  return (
    drinkData && (
      <div
        className={
          isOpenedCart
            ? styles.container
            : `${styles.container} ${styles.container_hidden}`
        }
      >
        <CloseButton className={styles.closeButton} onClick={onClose} />
        <ul className={styles.list}>{order}</ul>
        <div className={styles.footer}>
          <div className={styles.footerContainer}>
            <h3 className={styles.total}>Сумма заказа</h3>
            <p className={styles.price}>{total} ₽</p>
          </div>
          <div className={styles.addToOrder}>Добавить к заказу?</div>
          <ul className={styles.extraList}>{extra}</ul>
        </div>
      </div>
    )
  );
};

export default Cart;
