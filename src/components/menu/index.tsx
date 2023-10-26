import style from "./index.module.css";
import {
  useAppDispatch,
  useAppSelector,
} from "../../services/store/index.types";
import { addToCart } from "../../services/slices/cart";
import {
  MenuElement,
  MenuObject,
} from "../../services/slices/menu/index.types";
import { Spinner } from "react-bootstrap";
//
const Menu = () => {
  const dispatch = useAppDispatch();

  const { menu } = useAppSelector((state) => state.menu);
  const pizzaData: MenuElement = menu[0];
  const saladData: MenuElement = menu[1];
  const rollData: MenuElement = menu[2];
  const drinkData: MenuElement = menu[3];
  const generateData = (data: MenuObject[]) =>
    data.map(({ _id, name, price, description, img, isNewProduct }) => {
      return (
        <li key={_id} className={style["menu__item"]}>
          {isNewProduct ? (
            <div className={style["menu__item-label"]}>new</div>
          ) : null}
          <img className={style["menu__item-image"]} src={img} alt={name} />
          <h3 className={style["menu__item-heading"]}>{name}</h3>
          <p className={style["menu__item-description"]}>{description}</p>
          <div className={style["menu__item-footer"]}>
            <div className={style["menu__item-price"]}>от {price} ₽</div>
            <button
              onClick={() => {
                dispatch(
                  addToCart({
                    _id,
                    name,
                    price,
                    description,
                    img,
                    isNewProduct,
                  }),
                );
              }}
              className={style["menu__button"]}
            >
              В корзину
            </button>
          </div>
        </li>
      );
    });

  if (pizzaData && rollData && saladData && drinkData) {
    return (
      <section className={style["menu"]}>
        <article className={style["menu__category"]}>
          <h2 className={style["menu__heading"]}>Пицца</h2>
          <ul className={style["menu__list"]}>
            {generateData(pizzaData.pizzas)}
          </ul>
        </article>
        <article className={style["menu__category"]}>
          <h2 className={style["menu__heading"]}>Роллы</h2>
          <ul className={style["menu__list"]}>
            {generateData(rollData.rolls)}
          </ul>
        </article>
        <article className={style["menu__category"]}>
          <h2 className={style["menu__heading"]}>Салаты</h2>
          <ul className={style["menu__list"]}>
            {generateData(saladData.salads)}
          </ul>
        </article>
        <article className={style["menu__category"]}>
          <h2 className={style["menu__heading"]}>Напитки</h2>
          <ul className={style["menu__list"]}>
            {generateData(drinkData.drinks)}
          </ul>
        </article>
      </section>
    );
  }
  return <Spinner />;
};

export default Menu;
