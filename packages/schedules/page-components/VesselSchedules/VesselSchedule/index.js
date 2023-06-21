import { useRouter } from "@cogoport/next";
import useGetVesselScheduleById from "../hooks/useGetVesselScheduleById";
import Card from "./Card";
import RouteDetails from "./RouteDetails";
import styles from "./styles.module.css";
const VesselScheduele = () => {
  const { query } = useRouter();
  const vesselId = query?.id;
  const { data } = useGetVesselScheduleById({ vesselId });
  return (
    <>
      <div className={styles.back_button}></div>
      <Card vessel={data} />
      <div className={styles.flex}>
        <div>
          <RouteDetails route={data?.vessel_schedule_link} />
        </div>
        <div></div>
      </div>
    </>
  );
};
export default VesselScheduele;
