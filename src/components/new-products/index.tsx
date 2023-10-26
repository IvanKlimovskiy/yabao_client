import styles from "./index.module.css";
import {
  useAppDispatch,
  useAppSelector,
} from "../../services/store/index.types";
import { open, setModalDetails } from "../../services/slices/modal";
import { MenuElement } from "../../services/slices/menu/index.types";
import { Spinner } from "react-bootstrap";

const NewProducts = () => {
  const dispatch = useAppDispatch();
  const { menu } = useAppSelector((state) => state.menu);
  const menuData: MenuElement = menu[0];
  if (menuData) {
    const pizzas = menuData.pizzas.map(
      ({ _id, img, name, price, description, isNewProduct }) => {
        return (
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
            className={styles["new-products__item"]}
          >
            <img
              className={styles["new-products__image"]}
              src={img}
              alt={name}
            />
            <div className={styles["new-products__item-wrapper"]}>
              <h3 className={styles["new-products__item-heading"]}>{name}</h3>
              <p className={styles["new-products__item-price"]}>от {price} ₽</p>
            </div>
          </li>
        );
      },
    );
    return (
      <section className={styles["new-products"]}>
        <h2 className={styles["new-products__heading"]}>Новое и популярное</h2>
        <ul className={styles["new-products__list"]}>{pizzas}</ul>
      </section>
    );
  } else {
    return (
      <section className={styles["new-products"]}>
        <h2 className={styles["new-products__heading"]}>Новое и популярное</h2>
        <Spinner />
      </section>
    );
  }
};

export default NewProducts;
