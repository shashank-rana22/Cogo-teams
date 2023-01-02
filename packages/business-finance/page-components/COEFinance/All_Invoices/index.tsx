import React,{useEffect, useState} from "react"
import PurchaseInvoice from './PurchaseInvoiceView';
import styles from './styles.module.css'
import { useRouter } from '@cogoport/next';
import ShipmentIdView from "./ShipmentIdView/index";
const AllInvoices = () => {
    const { push, query } = useRouter();
    const [subActiveTab, setSubActiveTab] = useState(query.view || "purchase-view");

    const isPurchase =subActiveTab==="purchase-view"

    useEffect(() => {
        push(
            "/business-finance/coe-finance/[active_tab]/[view]",
            `/business-finance/coe-finance/all_invoices/${subActiveTab}`
        );
    }, [subActiveTab]);

    return (
        <div>
            <div className={styles.container}>
                <div onClick={() =>{setSubActiveTab("purchase-view")}}>
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
                <div onClick={() =>{ setSubActiveTab("shipment-view")}}>
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
            {isPurchase && <PurchaseInvoice />}
            {!isPurchase && <ShipmentIdView />}
        </div>
    );
};
export default AllInvoices;
