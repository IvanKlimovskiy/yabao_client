import styles from "./app.module.css";
import Header from "../header";
import Slider from "../slider";
import Feedback from "../feedback";

const App = () => {
  return (
    <div className={styles.page}>
      <Header />
      <main className={styles.main}>
        <Slider />
        <Feedback />
      </main>
    </div>
  );
};

export default App;
