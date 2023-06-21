import { useState } from "react";
import SailingSchedulesManagement from "../SailingSchedulesManagement";
import { Button } from "@cogoport/components";
import styles from "./styles.module.css";
import Filters from "./Filters";

function ServiceLane() {
    const [activeTab, setActiveTab] = useState("service_lanes");
    return (
        <>
            <div className={styles.button}>
                <SailingSchedulesManagement
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                />

                <Button size="md" themeType="primary">
                    + Create
                </Button>
            </div>

            <div>
                <Filters></Filters>
            </div>
        </>
    );
}
export default ServiceLane;
