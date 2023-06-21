import { useState } from "react";
import SailingSchedulesManagement from "../../SailingSchedulesManagement";
import { Button } from "@cogoport/components";
import styles from "./styles.module.css";
import Filters from "./Filters";
import Cards from "./Cards";
import useListServiceLanes from "./hooks/useListServiceLanes";

function ServiceLanesList() {
    const [activeTab, setActiveTab] = useState("service_lanes");

    const { data } = useListServiceLanes();
    // console.log("data: ", data);
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

            <div>
                {data?.map((item) => (
                    <Cards item={item} />
                ))}
            </div>
        </>
    );
}
export default ServiceLanesList;
