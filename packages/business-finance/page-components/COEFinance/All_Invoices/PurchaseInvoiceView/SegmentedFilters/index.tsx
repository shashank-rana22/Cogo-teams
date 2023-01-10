import React, { useState } from "react";
import SegmentedControl from "../../../../commons/SegmentedControl/index";
import styled from "./styles.module.css";
import { FILTERS_URGENT_DATA } from "../../../constants/purchase-list-filters";
import FILTERS_DATA from "../../../constants/purchase-list-filters";
import { Input } from "@cogoport/components";
import { IcMSearchdark } from "@cogoport/icons-react";
import FilterModal from "../../../Components/FilterModal/index";
import useShipmentIdView from "../../../hook/useShipmentIdView";

interface segmentFilterProps {
    setSearchValue: React.Dispatch<React.SetStateAction<string | number>>;
    searchValue: string | number;
    currentTab: string;
    setCurrentTab: React.Dispatch<React.SetStateAction<string>>;
}

function SegmentedFilters({
    setCurrentTab,
    currentTab,
    setSearchValue,
    searchValue,
    filters,
    setFilters,
}: segmentFilterProps) {
    const { statsData } = useShipmentIdView();

    return (
        <div className={styled.main}>
            <div className={styled.segment}>
                <div className={styled.filterData}>
                    <SegmentedControl
                        options={FILTERS_DATA(statsData)}
                        activeTab={currentTab}
                        setActiveTab={setCurrentTab}
                        color={"#ED3726"}
                        background={"#FFFAEB"}
                    />
                </div>
                {/* <div className={styled.filterData}>
                    <SegmentedControl
                        options={FILTERS_DAY_DATA}
                        activeTab={currentTab}
                        setActiveTab={setCurrentTab}
                        color={"#ED3726"}
                        background={"#FFFAEB"}
                    />
                </div> */}
                <div className={styled.filterDataUrgent}>
                    <SegmentedControl
                        options={FILTERS_URGENT_DATA}
                        activeTab={currentTab}
                        setActiveTab={setCurrentTab}
                        color={"#ED3726"}
                        background={"#FFFAEB"}
                    />
                </div>
            </div>
            <div className={styled.searchFilter}>
                <div className={styled.search}>
                    <Input
                        name="q"
                        size="sm"
                        value={searchValue}
                        onChange={(e: any) => setSearchValue(e)}
                        placeholder="Search by Invoice No./Shipment ID/Supplier name..."
                        suffix={<IcMSearchdark height={15} width={15} />}
                    />
                </div>
                <FilterModal setFilters={setFilters} filters={filters} />
            </div>
        </div>
    );
}

export default SegmentedFilters;
