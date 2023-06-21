import Upper from "../../VesselSchedulesList/VesselScheduleCard/Upper";
import Lower from "./Lower";
import styles from "./styles.module.css";
const Card = ({ vessel }) => {
  return (
    <>
      <div className={styles.card} onClick={() => navigateTo()}>
        <div className={styles.upper}>
          <Upper vessel={vessel} />
        </div>
        <Lower vessel={vessel} />
      </div>
    </>
  );
};
export default Card;
