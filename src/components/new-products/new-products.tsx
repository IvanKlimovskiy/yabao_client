import { Spinner } from "react-bootstrap";
import styles from "./new-products.module.css";
import {
  useAppDispatch,
  useAppSelector,
} from "../../services/store/store.types";
import { open, setModalDetails } from "../../services/slices/modal/modal";
import { MenuElement } from "../../services/slices/menu/menu.types";

const NewProducts = () => {
  const dispatch = useAppDispatch();
  const { menu } = useAppSelector((state) => state.menu);
  const menuData: MenuElement = menu[0];
  if (menuData) {
    const pizzas = menuData.pizzas.map(
      ({ _id, img, name, price, description, isNewProduct }) => (
        <li
          key={_id}
          onClick={() => {
            dispatch(
              setModalDetails({
                _id,
                img,
                name,
                price,
                description,
                isNewProduct,
              }),
            );
            dispatch(open());
          }}
          className={styles.item}
        >
          <img className={styles.image} src={img} alt={name} />
          <div className={styles.itemWrapper}>
            <h3 className={styles.itemTitle}>{name}</h3>
            <p className={styles.itemPrice}>от {price} ₽</p>
          </div>
        </li>
      ),
    );
    return (
      <section className={styles.container}>
        <h2 className={styles.title}>Новое и популярное</h2>
        <ul className={styles.list}>{pizzas}</ul>
      </section>
    );
  }

  return (
    <section className={styles.container}>
      <h2 className={styles.title}>Новое и популярное</h2>
      <Spinner />
    </section>
  );
};

export default NewProducts;
