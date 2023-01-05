import React, { useEffect } from "react";
import Filter from "../../../../commons/Filters";
import SegmentedControl from "../../../../commons/SegmentedControl";
import { APPROVAL, JOBS } from "../../../constants/shipmentListFilters";
import styles from "./styles.module.css";
import controls from "./controls";
import { Input } from "@cogoport/components";
import { IcMSearchdark } from "@cogoport/icons-react";

interface propsType {
    hookSetters: {};
    filters: {};
}

const Filters = ({ hookSetters, filters }: propsType) => {
    return (
        <div className={styles.container}>
            <div className={styles.service}>
                <Filter
                    controls={controls}
                    filters={filters}
                    setFilters={hookSetters.setFilters}
                />
            </div>
        </div>
    );
};

export default Filters;
