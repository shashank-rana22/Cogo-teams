import { useState } from "react";
import SailingSchedulesManagement from "../../SailingSchedulesManagement";
import { Button } from "@cogoport/components";
import styles from "./styles.module.css";
import Filters from "./Filters";
import Cards from "./Cards";
import useListServiceLanes from "./hooks/useListServiceLanes";
import LoadingState from "../LoadingState";

function ServiceLanesList({ mapTab, setMapTab }) {
    const [activeTab, setActiveTab] = useState("service_lanes");
    const filters = null;

    const { data, loading } = useListServiceLanes({ filters });

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
            <Filters />
            {!loading ? (
                data?.map((item) => (
                    <Cards item={item} mapTab={mapTab} setMapTab={setMapTab} />
                ))
            ) : (
                <LoadingState />
            )}
        </>
    );
}
export default ServiceLanesList;
