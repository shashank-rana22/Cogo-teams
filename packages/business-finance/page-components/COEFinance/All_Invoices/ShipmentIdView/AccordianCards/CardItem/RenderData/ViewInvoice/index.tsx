import { Button } from "@cogoport/components";
import { useRouter } from "@cogoport/next";
import React from "react";
import styles from "./styles.module.css";
interface itemTypes {
    urgencyTag?: string;
}

interface propsType {
    item: itemTypes;
    field: any;
}

const ViewInvoice = ({ item, field }: propsType) => {
    const router = useRouter();
    const handleChange = (itemData: any) => {
        router.push(
            `/business-finance/coe-finance/${router.query.active_tab}/view-invoices?billId=${itemData?.billId}&billNumber=${itemData?.billNumber}&orgId=${itemData?.organizationId}&jobNumber=${itemData?.jobNumber}`
        );
    };
    return (
        <div className={styles.button}>
            {item?.urgencyTag && (
                <div className={styles.Ribbons}>
                    <div className={styles.ribbon}>Urgent</div>
                </div>
            )}
            <div
                className={styles.link}
                onClick={() => {
                    handleChange(item);
                }}
            >
                View Invoices
            </div>
        </div>
    );
};

export default ViewInvoice;
