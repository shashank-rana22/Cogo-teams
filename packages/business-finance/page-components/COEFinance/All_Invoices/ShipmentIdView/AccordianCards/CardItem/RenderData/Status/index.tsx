import React from "react";
import styles from "./styles.module.css";
import { startCase } from "@cogoport/utils";

interface itemTypes {
    status?: string;
}

interface propsType {
    item: itemTypes;
    field: any;
}

const Status = ({ item, field }: propsType) => {
    const { status }: itemTypes = item;
    if (status === "FINANCE_ACCEPTED") {
        return <div className={styles.financeAccepted}>Finance Accepted</div>;
    } else if (status === "INITIATED") {
        return <div className={styles.initiated}>Initiated</div>;
    } else if (status === "ACCEPTED") {
        return <div className={styles.accepted}>Accepted</div>;
    } else if (status === "financeRejected") {
        return (
            <div className={styles.StatusFinanceRejected}>Finance Rejected</div>
        );
    } else if (status === "POSTED") {
        return <div className={styles.posted}>Posted</div>;
    } else if (status === "VOID") {
        return <div className={styles.void}>Void</div>;
    } else if (status === "COE_REJECTED") {
        return <div className={styles.coeRejected}>COE Rejected</div>;
    }

    return <div className={styles.draft}>{startCase(status)} </div>;
};

export default Status;
