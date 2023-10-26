import style from "../components/menu/menu.module.css";

interface Data {
  id: number;
  name: string;
  img: string;
  price: number;
  description: string;
  isNew: boolean;
}
const generateData = (data: Data[]) => data.map(({id, name, price, description, img, isNew}) => {
    return (
        <li key={id} className={style["menu__item"]}>
        {isNew ? <div className={style["menu__item-label"]}>new</div> : null}
                <img className={style["menu__item-image"]} src={img} alt={name} />
    <h3 className={style["menu__item-heading"]}>{name}</h3>
        <p className={style["menu__item-description"]}>{description}</p>
        <div className={style["menu__item-footer"]}>
    <div className={style["menu__item-price"]}>от {price} ₽</div>
    <button className={style["menu__button"]}>В корзину</button>
    </div>
    </li>
    )
});
