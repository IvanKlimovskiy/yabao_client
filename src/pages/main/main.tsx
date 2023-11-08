import React from "react";
import { MainFC } from "./main.types.ts";
import Slider from "../../components/slider/slider.tsx";
import Feedback from "../../components/feedback/feedback.tsx";
import NewProducts from "../../components/new-products/new-products.tsx";
import NewProductDetails from "../../components/new-product-details/new-product-details.tsx";
import Menu from "../../components/menu/menu.tsx";
import DeliveryPayment from "../../components/delivery-payment/delivery-payment.tsx";
import SpecialOffers from "../../components/special-offers/special-offers.tsx";

const Main: React.FC<MainFC> = ({ isFixedHeader }) => {
  return (
    <>
      <Slider isFixedHeader={isFixedHeader} />
      <Feedback />
      <NewProducts />
      <Menu />
      <NewProductDetails />
      <SpecialOffers />
      <DeliveryPayment />
    </>
  );
};

export default Main;
