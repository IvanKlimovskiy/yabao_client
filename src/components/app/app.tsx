import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import styles from "./app.module.css";
import Header from "../header/header.tsx";
import {
  useAppDispatch,
  useAppSelector,
} from "../../services/store/store.types";
import { getMenu } from "../../services/slices/menu/menu";
import { getUsers } from "../../services/slices/users/users";
import { Spinner as BootstrapSpinner } from "react-bootstrap";
import Spinner from "../../spinner/spinner.tsx";
import ErrorPage from "../../pages/error-page/error-page.tsx";
import Footer from "../footer/footer.tsx";
import SignupModal from "../signup-modal/signup-modal.tsx";
import { Profile, Main } from "../../pages";
import { getCurrentUser } from "../../services/slices/profile/profile.ts";

const App = () => {
  const { loading, error } = useAppSelector((state) => state.menu);
  const loadingProfileData = useAppSelector((state) => state.profile.loading);
  const { isLoggingOut } = useAppSelector((state) => state.profile);
  const [isFixedHeader, setIsFixedHeader] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getCurrentUser());
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

  if (loading || loadingProfileData) {
    return <Spinner height={"100vh"} />;
  }
  if (error) return <ErrorPage />;

  return (
    <BrowserRouter>
      <>
        <div
          className={
            isLoggingOut ? `${styles.page_loading} ${styles.page}` : styles.page
          }
        >
          <Header isFixedHeader={isFixedHeader} />
          <Routes>
            <Route
              path={"/"}
              element={
                <main className={styles.main}>
                  <Main isFixedHeader={isFixedHeader} />
                </main>
              }
            />
            <Route path={"/profile"} element={<Profile />} />
          </Routes>
          <Footer />
          <SignupModal />
        </div>
        {isLoggingOut ? (
          <div className={styles.layer}>
            <BootstrapSpinner />
          </div>
        ) : null}
      </>
    </BrowserRouter>
  );
};

export default App;
