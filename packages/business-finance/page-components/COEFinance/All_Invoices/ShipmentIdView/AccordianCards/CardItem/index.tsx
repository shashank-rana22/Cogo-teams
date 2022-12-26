import React from "react";
import List from "../../../../../commons/List/index";
import { ShipmentIdViewConfig } from "../../../../configurations/shipmentIdView";

const CardItem = () => {
    return (
        <div>
            <List config={ShipmentIdViewConfig}></List>
        </div>
    );
};

export default CardItem;
