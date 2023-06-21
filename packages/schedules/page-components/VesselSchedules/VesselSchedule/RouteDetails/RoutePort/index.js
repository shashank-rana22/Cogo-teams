import { format } from "@cogoport/utils";
import styles from "./styles.module.css";
const RoutePort = ({ isFirst, isLast, port, diffInDays }) => {
  return (
    <>
      <div className={styles.route_port}>
        <div className={styles.left}>
          <div className={styles.eta_etd}>
            <div className={styles.eta}>
              ETA : {format(port?.eta, "dd MMM yyyy HH:mm")}
            </div>
            <div className={styles.etd}>
              ETD : {format(port?.etd, "dd MMM yyyy HH:mm")}
            </div>
          </div>
        </div>
        <div className={styles.middle}>
          {!isFirst && <div className={styles.hr_line_up}></div>}
          <div className={styles.circle}></div>
          {!isLast && <div className={styles.hr_line_down}></div>}
        </div>
        <div className={styles.right}>
          <div className={styles.port_name}>
            {port?.display_name}, <span className={styles.port_terminal}></span>
          </div>
          {!isLast && (
            <div className={styles.diff_in_days}>{diffInDays} Days</div>
          )}
        </div>
      </div>
    </>
  );
};
export default RoutePort;
