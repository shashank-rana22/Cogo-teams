import React, { useState } from "react";
import Filter from "../../../../commons/Filters";
import styles from "./styles.module.css";
import controls from "./controls";
import SegmentedControl from "../../../../commons/SegmentedControl";
import { APPROVAL, JOBS } from "../../../constants/shipmentListFilters";
interface propsType {
    hookSetters: { setFilters };
    filters: {};
    pending_approval: string;
    setPending_approval: Function;
}

const Filters = ({
    hookSetters,
    filters,
    pending_approval,
    setPending_approval,

}: propsType) => {
    return (
        <div className={styles.container}>
            <div className={styles.segmented}>
                <SegmentedControl
                    options={APPROVAL}
                    activeTab={pending_approval}
                    setActiveTab={setPending_approval}
                    background="#FFFAEB"
                    color="#ED3726"
                />
              
            </div>
            <Filter
                controls={controls}
                filters={filters}
                setFilters={hookSetters.setFilters}
            />
        </div>
    );
};

export default Filters;
