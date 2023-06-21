import { useState } from "react";
import SailingSchedulesManagement from "../SailingSchedulesManagement";
import { Button } from "@cogoport/components";
import styles from "./styles.module.css";

function ServiceLane() {
    const [activeTab, setActiveTab] = useState("service_lanes");
    return (
        <div className={styles.button}>
            <SailingSchedulesManagement
                activeTab={activeTab}
                setActiveTab={setActiveTab}
            />

            <Button size="md" themeType="primary">
                + Create
            </Button>
        </div>
    );
}
export default ServiceLane;
