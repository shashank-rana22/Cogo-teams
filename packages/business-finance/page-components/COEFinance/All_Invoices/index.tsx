import React,{useState} from "react"
import PurchaseInvoice from './PurchaseInvoiceView/index';
import styles from './styles.module.css'
import ShipmentIdView from "./ShipmentIdView/index";

const AllInvoices = () => {
    const [isPurchase, setIsPurchase] = useState(true);
    const [filters, setFilters]=useState({})

    return (
        <div>
            <div className={styles.container}>
                <div className={styles.flex}>
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
            </div>
            {isPurchase && <PurchaseInvoice filters={filters} setFilters={setFilters} />}
            {!isPurchase && <ShipmentIdView />}
        </div>
    );
};
export default AllInvoices;
