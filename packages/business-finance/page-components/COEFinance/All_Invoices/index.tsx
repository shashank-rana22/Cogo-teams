import React, { useState } from "react";
import styles from "./styles.module.css";
import { Button } from "@cogoport/components";
import { useRouter } from "@cogoport/next";
import TabSelect from "../../commons/TabSelect/index";
const AllInvoices = () => {
    const router = useRouter();
    const [isPurchase, setIsPurchase] = useState(true);

    return (
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
                <Button
                    size="md"
                    themeType="secondary"
                    onClick={() =>
                        router.push(
                            "/business-finance/coe-finance/view-invoices"
                        )
                    }
                >
                    View Invoices
                </Button>
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
                {!isPurchase && <ShipmentIdView />}
            </div>
        </div>
    );
};
export default AllInvoices;
