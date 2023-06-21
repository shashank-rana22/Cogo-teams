import { TabPanel, Tabs } from "@cogoport/components";
import styles from "./styles.module.css";

function SailingSchedulesManagement({ activeTab, setActiveTab }) {
    return (
        <>
            <div className={styles.title}>Sailing Schedules Management</div>
            <Tabs
                activeTab={activeTab}
                themeType="secondary"
                onChange={setActiveTab}
            >
                <TabPanel name="sailing_schedules" title="Sailing Schedules">
                    <div>Sailing Schedules</div>
                </TabPanel>

                <TabPanel name="vessel_schedules" title="Vessel Schedules">
                    <div>Vessel Schedule</div>
                </TabPanel>

                <TabPanel name="service_lanes" title="Service Lanes">
                    <div>Sailing Schedules</div>
                </TabPanel>
            </Tabs>
        </>
    );
}
export default SailingSchedulesManagement;
