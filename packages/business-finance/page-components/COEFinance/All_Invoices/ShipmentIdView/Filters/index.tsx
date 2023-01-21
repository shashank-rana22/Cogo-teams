import React, { useState } from "react";
import Filter from "../../../../commons/Filters";
import styles from "./styles.module.css";
import controls from "./controls";
import SegmentedControl from "../../../../commons/SegmentedControl";
import { APPROVAL, JOBS } from "../../../constants/shipmentListFilters";
import { Input } from "@cogoport/components";
import { IcMSearchdark } from "@cogoport/icons-react";
interface propsType {
    hookSetters: { setFilters };
    filters: {};
    pending_approval: string;
    setPending_approval: Function;
    serial_id:string;
    setSerial_id:Function;
}

const Filters = ({
    hookSetters,
    filters,
    pending_approval,
    setPending_approval,
    serial_id,
    setSerial_id,

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
            <div className={styles.searchFilter}>
            <Filter
                controls={controls}
                filters={filters}
                setFilters={hookSetters.setFilters}
            />
            <div className={styles.search}>
            <Input
                name="serial_id"
                size="sm"
                value={serial_id}
                onChange={(e: any) => setSerial_id(e)}
                placeholder="Search by Shipment ID"
                suffix={<IcMSearchdark height={15} width={15} />}
            />
            </div>
            </div>
        </div>
    );
};

export default Filters;
