import styles from "./app.module.css";
import Header from "../header";
import Slider from "../slider";
import Feedback from "../feedback";
import NewProducts from "../new-products";
import NewProductDetails from "../new-product-details";
import Menu from "../menu";
import { useEffect, useState } from "react";
import {
  useAppDispatch,
  useAppSelector,
} from "../../services/store/index.types";
import { getMenu } from "../../services/slices/menu";
import { getUsers } from "../../services/slices/users";
import Spinner from "../../spinner";
import ErrorPage from "../pages/error-page";

const App = () => {
  const { loading, error } = useAppSelector((state) => state.menu);
  const [isFixedHeader, setIsFixedHeader] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getMenu());
    dispatch(getUsers());
    const handleScroll = () => {
      if (window.scrollY < 98) {
        setIsFixedHeader(false);
      } else {
        setIsFixedHeader(true);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return loading ? (
    <Spinner height={"100vh"} />
  ) : error ? (
    <ErrorPage />
  ) : (
    <div className={styles["page"]}>
      <Header isFixedHeader={isFixedHeader} />
      <main className={styles["main"]}>
        <Slider isFixedHeader={isFixedHeader} />
        <Feedback />
        <NewProducts />
        <Menu />
      </main>
      <NewProductDetails />
    </div>
  );
};

export default App;
