import React from "react";
import { MainFC } from "./index.types.ts";
import Slider from "../../components/slider/index.tsx";
import Feedback from "../../components/feedback/index.tsx";
import NewProducts from "../../components/new-products/index.tsx";
import NewProductDetails from "../../components/new-product-details/index.tsx";
import Menu from "../../components/menu/index.tsx";
import DeliveryPayment from "../../components/delivery-payment/index.tsx";
import SpecialOffers from "../../components/special-offers/index.tsx";

const Main: React.FC<MainFC> = ({ isFixedHeader }) => (
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

export default Main;
