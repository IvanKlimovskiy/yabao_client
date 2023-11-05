import styles from "./profile.module.css";
import { useAppSelector } from "../../services/store/store.types.ts";
import present from "../../images/present.jpg";

const Profile = () => {
  const { profileData } = useAppSelector((state) => state.profile);

  return (
    <section>
      <h2>Мои бонусы</h2>
      <div>
        <img src={present} alt="Подарок" />
        <p>Бонусы появятся здесь после заказа</p>
      </div>
      <div>
        <a href="">Все наши акции</a>
      </div>
      <h2>Личные данные</h2>
      <div>Фото профиля</div>
      <img src={profileData.img} alt="Фото профиля" />
      <form>
        <label htmlFor="name">Имя</label>
        <input id={"name"} name={"name"} type="text" value={profileData.name} />
        <label htmlFor="number">Номер телефона</label>
        <input
          id={"number"}
          name={"number"}
          type="text"
          value={profileData.number}
        />
        <label htmlFor="date">Дата рождения</label>
        <input id={"date"} name={"date"} type="date" />
      </form>
      <h2>Подписки</h2>
      <form>
        <label htmlFor="subscribeToNotifications">
          Сообщать о бонусах, акциях и новых продуктах
        </label>
        <input
          id={"subscribeToNotifications"}
          name={"subscribeToNotifications"}
          type="checkbox"
        />
      </form>
      <button>Выйти</button>
    </section>
  );
};

export default Profile;
