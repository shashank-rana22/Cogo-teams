import { format } from "@cogoport/utils";
import styles from "./styles.module.css";
const Lower = ({ vessel }) => {
  return (
    <>
      <div className={styles.lower}>
        <div className={styles.left}>
          <div>
            <div className={styles.port_heading}>Origin</div>
            <div className={styles.port_name}>
              {vessel?.vessel_schedule_link?.[0]?.display_name}
            </div>
            <div className={styles.time}>
              {format(
                vessel?.vessel_schedule_link?.[0]?.etd,
                "hh:mm | dd MMM yyyy"
              )}
            </div>
          </div>
          <div>
            <div className={styles.port_heading}>Destination</div>
            <div className={styles.port_name}>
              {
                vessel?.vessel_schedule_link?.[
                  vessel?.vessel_schedule_link?.length - 1
                ]?.display_name
              }
            </div>
            <div className={styles.time}>
              {format(
                vessel?.vessel_schedule_link?.[
                  vessel?.vessel_schedule_link?.length - 1
                ]?.eta,
                "dd MMM yyyy hh:mm"
              )}
            </div>
          </div>
        </div>
        <div className={styles.right}>
          <div className={styles.details}>
            <div>
              {" "}
              <span className={styles.key}>Voyage No: </span>323S
            </div>
            <div>
              {" "}
              <span className={styles.key}>Voyage No: </span>323S
            </div>
            <div>
              {" "}
              <span className={styles.key}>Voyage No: </span>323S
            </div>
            <div>
              {" "}
              <span className={styles.key}>Voyage No: </span>323S
            </div>
            <div>
              {" "}
              <span className={styles.key}>Voyage No: </span>323S
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Lower;
