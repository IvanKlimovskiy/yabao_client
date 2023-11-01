import { useEffect, useState } from "react";
import styles from "./app.module.css";
import Header from "../header/header.tsx";
import Slider from "../slider/slider.tsx";
import Feedback from "../feedback/feedback.tsx";
import NewProducts from "../new-products/new-products.tsx";
import NewProductDetails from "../new-product-details/new-product-details.tsx";
import Menu from "../menu/menu.tsx";
import {
  useAppDispatch,
  useAppSelector,
} from "../../services/store/store.types";
import { getMenu } from "../../services/slices/menu/menu";
import { getUsers } from "../../services/slices/users/users";
import Spinner from "../../spinner/spinner.tsx";
import ErrorPage from "../pages/error-page/error-page.tsx";
import DeliveryPayment from "../delivery-payment/delivery-payment.tsx";
import SpecialOffers from "../special-offers/special-offers.tsx";
import Footer from "../footer/footer.tsx";

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

  if (loading) {
    return <Spinner height={"100vh"} />;
  }
  if (error) return <ErrorPage />;

  return (
    <div className={styles.page}>
      <Header isFixedHeader={isFixedHeader} />
      <main className={styles.main}>
        <Slider isFixedHeader={isFixedHeader} />
        <Feedback />
        <NewProducts />
        <Menu />
      </main>
      <NewProductDetails />
      <SpecialOffers />
      <DeliveryPayment />
      <Footer />
    </div>
  );
};

export default App;
