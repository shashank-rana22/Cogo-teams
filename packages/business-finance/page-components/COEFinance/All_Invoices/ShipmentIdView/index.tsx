import React from "react";
import AccordianCards from "./AccordianCards/index";

const ShipmentIdView = () => {
    return (
        <div>
            <h1>shipment view</h1>
            <div>
                {[1, 2, 3, 4, 5].map(() => {
                    return <AccordianCards />;
                })}
            </div>
        </div>
    );
};

export default ShipmentIdView;
