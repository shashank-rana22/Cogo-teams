import { Button } from "@cogoport/components";
import styles from "./styles.module.css";
import { useRouter } from "@cogoport/next";
function Lower({ vessel }) {
  const { push } = useRouter();
  const navigateTo = () => {
    push(
      "/schedules/vessel-schedules/[id]",
      `/schedules/vessel-schedules/${vessel?.id}`
    );
  };
  return (
    <>
      <div className={styles.lower}>
        <div className={styles.lower_left}>
          <div>Vessel Details</div>
          {[0, 0, 0, 0].map((feature) => (
            <div>
              <div className={styles.feature_name}>TEU (Nominal)</div>
              <div className={styles.feature_value}>98112</div>
            </div>
          ))}
        </div>
        <div clasName={styles.right}>
          <Button themeType="accent" size="lg" onClick={() => navigateTo()}>
            View Route Details{" "}
          </Button>
        </div>
      </div>
    </>
  );
}
export default Lower;
