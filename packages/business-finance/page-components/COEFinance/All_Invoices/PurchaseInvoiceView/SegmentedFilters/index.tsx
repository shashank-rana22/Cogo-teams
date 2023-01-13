import React, { useState } from "react";

import SegmentedControl from "../../../../commons/SegmentedControl/index";

import styled from "./styles.module.css";

import { FILTERS_URGENT_DATA } from "../../../constants/purchase-list-filters";

import FILTERS_DATA from "../../../constants/purchase-list-filters";

import { Input } from "@cogoport/components";

import { IcMSearchdark } from "@cogoport/icons-react";

import FilterModal from "../../../Components/FilterModal/index";

import useShipmentIdView from "../../../hook/useShipmentIdView";

import { GenericObject } from "../../../../commons/Interfaces/index";
import Filter from "../../../../commons/Filters";
import controls from "./controls";

interface segmentFilterProps {
    setSearchValue: any;

    searchValue: string;

    currentTab: string;

    setCurrentTab: React.Dispatch<React.SetStateAction<string>>;

    filters: GenericObject;

    setFilters: (p: object) => void;
}

function SegmentedFilters({
    setCurrentTab,

    currentTab,

    setSearchValue,

    searchValue,

    filters,

    setFilters,
}: segmentFilterProps) {
    const { statsData }: any = useShipmentIdView();

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

                <div className={styled.filterDataUrgent}>
                    <SegmentedControl
                        options={FILTERS_URGENT_DATA}
                        activeTab={currentTab}
                        setActiveTab={setCurrentTab}
                        color={"#ED3726"}
                        background={"#FFFAEB"}
                    />
                </div>
                <div className={styled.urgency}>
                    <Filter
                        controls={controls}
                        filters={filters}
                        setFilters={setFilters}
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
