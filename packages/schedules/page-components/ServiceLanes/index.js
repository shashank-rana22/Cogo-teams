import { useState } from "react";
import SailingSchedulesManagement from "../SailingSchedulesManagement";

function ServiceLane() {
    const [activeTab, setActiveTab] = useState("service_lanes");
    return (
        <>
            <SailingSchedulesManagement
                activeTab={activeTab}
                setActiveTab={setActiveTab}
            />
        </>
    );
}
export default ServiceLane;
