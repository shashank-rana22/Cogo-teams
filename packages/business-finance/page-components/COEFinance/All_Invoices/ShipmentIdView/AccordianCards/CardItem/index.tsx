import React from "react";
import List from "../../../../../commons/List/index";
import { ShipmentIdViewConfig } from "../../../../configurations/ShipmentIdView/expenseConfig";
import useListBills from "../../../../hook/useListBills";
// import markDuplicates from "./markDuplicates";

interface propsType {
    cardData: any;
    currentOpenSID: string;
    setCurrentOpenSID: Function;
    refetch: any;
    amountTab: string;
    setAmountTab: Function;
}

const CardItem = ({
    cardData,
    currentOpenSID,
    setCurrentOpenSID,
    refetch,
    amountTab,
}: propsType) => {
    const {
        loading,
        hookSetters,
        filters,
        list: { fullResponse },
        config,
    } = useListBills({
        serial_id: cardData?.serial_id,
        amountTab,
        currentOpenSID,
    });

    const { totalRecords, pageIndex, list } = fullResponse || {};

    // const modifiedList = markDuplicates(list);
    console.log(list, "list");

    return (
        <div>
            <List config={config} itemData={list} />
        </div>
    );
};

export default CardItem;
