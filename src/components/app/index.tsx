import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Spinner as BootstrapSpinner } from 'react-bootstrap';
import styles from './index.module.css';
import Header from '../header';
import { useAppDispatch, useAppSelector } from '../../services/store/index.types.ts';
import { getMenu } from '../../services/slices/menu';
import { getUsers } from '../../services/slices/users';
import Spinner from '../../spinner';
import Footer from '../footer';
import SignupModal from '../signup-modal';
import { Profile, Main, ErrorPage } from '../../pages';
import { getCurrentUser } from '../../services/slices/profile';
import ProtectedRouteAuthorized from '../protected-route-authorized';
import { setCartOwner } from 'services/slices/cart/index.ts';

const App = () => {
  const loading = useAppSelector((state) => state.menu.loading);
  const error = useAppSelector((state) => state.menu.error);
  const isLoggingOut = useAppSelector((state) => state.profile.isLoggingOut);
  const isLoading = useAppSelector((state) => state.profile.isLoading);
  const id = useAppSelector((state) => (state.profile.profileData._id ? state.profile.profileData._id : null));
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

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  if (loading || isLoading) {
    return <Spinner height={'100vh'} />;
  }
  if (error) return <ErrorPage />;
  // useEffect(() => {
  //   if (id) {
  //     dispatch(setCartOwner(id));
  //   }
  // }, [id]);

  return (
    <BrowserRouter>
      <>
        <div className={isLoggingOut ? `${styles.page_loading} ${styles.page}` : styles.page}>
          <Header isFixedHeader={isFixedHeader} />
          <Routes>
            <Route
              path={'/'}
              element={
                <main className={styles.main}>
                  <Main isFixedHeader={isFixedHeader} />
                </main>
              }
            />
            <Route
              path={'/profile'}
              element={
                <ProtectedRouteAuthorized>
                  <Profile isFixedHeader={isFixedHeader} />
                </ProtectedRouteAuthorized>
              }
            />
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
