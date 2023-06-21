import { TabPanel, Tabs } from "@cogoport/components";
import styles from "./styles.module.css";
import { useState } from "react";
import VesselSchedulesList from "./VesselSchedulesList";
function VesselSchedule() {
  const [activeTab, setActiveTab] = useState("vessel_schedules");
  return (
    <>
      <div className={styles.tilte}>Sailing Schedules Manangement</div>
      <Tabs activeTab={activeTab} themeType="secondary" onChange={setActiveTab}>
        <TabPanel name="sailing_schedules" title="Sailing Schedules">
          <div>Sailing Schedules</div>
        </TabPanel>

        <TabPanel name="vessel_schedules" title="Vessel Schedules">
          <VesselSchedulesList />
        </TabPanel>

        <TabPanel name="service_lanes" title="Service Lanes">
          <div>Service Lanes</div>
        </TabPanel>
      </Tabs>
    </>
  );
}
export default VesselSchedule;
