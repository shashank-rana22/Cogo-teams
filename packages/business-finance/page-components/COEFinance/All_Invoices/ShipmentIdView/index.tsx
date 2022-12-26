import React from "react";
import useShipmentIdView from "../../hook/useShipmentIdView";
import AccordianCards from "./AccordianCards/index";

const ShipmentIdView = () => {
    const { data } = useShipmentIdView();
    console.log(data, "data");

    return (
        <div>
            <div>
                {data?.list?.map((item: any) => {
                    return <AccordianCards itemData={item} />;
                })}
            </div>
        </div>
    );
};

export default ShipmentIdView;
