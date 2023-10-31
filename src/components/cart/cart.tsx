import { FC, MutableRefObject, useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { FreeMode, Pagination } from "swiper/modules";
import {
  useAppDispatch,
  useAppSelector,
} from "../../services/store/store.types";
import styles from "./cart.module.css";
import CartElement from "../cart-element/cart-element.tsx";
import { CartComponent } from "./cart.types";
import { toggleCart } from "../../services/slices/cart/cart";

const Cart: FC<CartComponent> = ({ navRef }) => {
  const { menu } = useAppSelector((state) => state.menu);
  const { cart, total, isOpenedCart } = useAppSelector((state) => state.cart);
  const drinkData = menu[3];
  const dispatch = useAppDispatch();
  const cartRef = useRef(null);

  const isDescendant = (
    element: MutableRefObject<HTMLElement | null>,
    target: EventTarget | null,
  ): boolean => {
    if (!element.current || !target) {
      return false;
    }

    if (
      element.current === target ||
      element.current.contains(target as Node)
    ) {
      return true;
    }

    return false;
  };

  const onClose = (event: MouseEvent) => {
    if (
      !isDescendant(cartRef, event.target) &&
      event.target !== navRef.current
    ) {
      dispatch(toggleCart(false));
    }
  };

  useEffect(() => {
    window.addEventListener("click", onClose);

    return () => {
      window.removeEventListener("click", onClose);
    };
  }, []);

  const order = cart.map((element) => (
    <CartElement key={element._id} element={element} />
  ));

  const emptyCart = (
    <li className={styles.itemTitle}>
      <h3>Корзина пуста</h3>
    </li>
  );

  const extra = drinkData
    ? drinkData.drinks.map(({ _id, name, img, price }) => (
        <SwiperSlide
          key={_id}
          style={{ display: "flex" }}
          className={styles.extraItem}
        >
          <img className={styles.extraItemImage} src={img} alt={name} />
          <div className={styles.extraItemBody}>
            <h3 className={styles.extraItemTitle}>{name}</h3>
            <div className={styles.extraItemText}>от {price} ₽</div>
          </div>
        </SwiperSlide>
      ))
    : null;

  return (
    drinkData && (
      <div
        ref={cartRef}
        className={
          isOpenedCart
            ? styles.container
            : `${styles.container} ${styles.container_hidden}`
        }
      >
        <ul className={styles.list}>{cart.length === 0 ? emptyCart : order}</ul>
        <div className={styles.footer}>
          <div className={styles.footerContainer}>
            <h3 className={styles.total}>Сумма заказа</h3>
            <p className={styles.price}>{total} ₽</p>
          </div>
          <div className={styles.addToOrder}>
            Добавить к заказу?{" "}
            <a href="#" className={styles.toCartLink}>
              Перейти в корзину
            </a>
          </div>
          <Swiper
            slidesPerView={1}
            spaceBetween={16}
            freeMode={true}
            pagination={{
              clickable: true,
            }}
            modules={[FreeMode, Pagination]}
            className={styles.extraList}
          >
            {extra}
          </Swiper>
        </div>
      </div>
    )
  );
};

export default Cart;
