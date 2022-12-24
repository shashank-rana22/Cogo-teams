import React, { useState } from "react";
import styles from "./styles.module.css";
import { Button } from "@cogoport/components";
import PurchaseInvoice from "./PurchaseInvoiceView";
import { useRouter } from "@cogoport/next";
import TabSelect from "../../commons/TabSelect/index";
import ShipmentIdView from "./ShipmentIdView/index";
const AllInvoices = () => {
    const router = useRouter();
    const [isPurchase, setIsPurchase] = useState(true);

    return (
        <div>
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
                    {isPurchase && (
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
                    )}
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
            {isPurchase && <PurchaseInvoice />}
        </div>
    );
};
export default AllInvoices;
