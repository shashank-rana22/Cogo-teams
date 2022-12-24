import React, { useState } from "react";
import ShipmentIdView from "./ShipmentIdView/index";
import styles from "./styles.module.css";
const AllInvoices = () => {
    const [isPurchase, setIsPurchase] = useState(true);

    return (
        <>
            <div className={styles.container}>
                <div onClick={() => setIsPurchase(true)}>
                    <div
                        className={
                            isPurchase
                                ? styles.subContainerClick
                                : styles.subContainer
                        }
                    >
                        {" "}
                        PURCHASE INVOICE VIEW{" "}
                    </div>
                </div>
                <div onClick={() => setIsPurchase(false)}>
                    <div
                        className={
                            !isPurchase
                                ? styles.subContainerClick
                                : styles.subContainer
                        }
                    >
                        SHIPMENT ID VIEW
                    </div>
                </div>
            </div>
            {!isPurchase && <ShipmentIdView />}
        </>
    );
};
export default AllInvoices;
